import Bee from "bee-queue";
import DummyJob from "../app/jobs/DummyJob";
import WelcomeEmailJob from "../app/jobs/WelcomeEmailJob";

import redisConfig from "../config/Redis";

const jobs = [DummyJob, WelcomeEmailJob];

class Queue {
    constructor() {
        this.queues = {};
        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: {
                        host: redisConfig.host,
                        port: redisConfig.port,
                    },
                }),
                handle,
            }
        });
    };

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    };

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.on("failed", this.handleFailed).process(handle);
        });
    };

    handleFailed(job, err) {
        if(process.env.NODE_ENV === "development"){
            console.error(`Queue ${job.queue.name} : FAILED`, err);
        }
    }

}

export default new Queue();