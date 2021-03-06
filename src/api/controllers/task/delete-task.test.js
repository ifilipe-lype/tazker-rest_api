const { postTask, deleteTask } = require(".");

const { generateFakeTask } = require("../../../../__tests__/data-faker");


describe("Patching a task", () => {

    it("Should delete a task by id", async (done) => {
        const result = await postTask({
            body: generateFakeTask(),
            realRequestObj: {userId: generateFakeTask().ownerId }
        });

        const { posted } = result.body;

        const { body, statusCode } = await deleteTask({
            params: { id: posted._id},
            realRequestObj: {userId: generateFakeTask().ownerId }
        })

        expect(statusCode).toBe(200);
        expect(body.deleted._id.toString()).toBe(posted._id.toString());
        done()
    });

    it("Should catch any thrown error", async (done) => {
        const { body, statusCode } = await deleteTask(
            { params: { id: "5e8454326b9a0b352e98a9a4"},
            realRequestObj: {userId: generateFakeTask().ownerId }
        });

        expect(statusCode).toBe(404);
        expect(body.error).toBe("Task not found!");
        done()
    })

});