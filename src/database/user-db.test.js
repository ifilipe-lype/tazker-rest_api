const { UserDb} = require("./")

const { generateFakeUser } = require("../../__tests__/data-faker");

describe("User Database Interactor", () => {
    it("Should insert an user into database", async (done) => {
        const userInfo = generateFakeUser();
        const createdUser = await UserDb.insert(userInfo);

        expect(createdUser).toBeDefined();
        expect(createdUser._id).toBeDefined();
        expect(createdUser.firstname).toBe(userInfo.firstname);
        expect(createdUser.lastname).toBe(userInfo.lastname);
        expect(createdUser.email).toBe(userInfo.email);
        expect(createdUser.password).toBe(userInfo.password);
        expect(createdUser.createdAt).toBeDefined();
        done();
    })

    it("Should find an user by Id", async (done) => {
        const createdUser = await UserDb.insert(generateFakeUser())
        const foundUser = await UserDb.findById(createdUser._id);
        
        expect(foundUser).toBeDefined();
        expect(foundUser._id).toStrictEqual(createdUser._id);
        done();
    });

    it("Should find an user by Email", async (done) => {
        const createdUser = await UserDb.insert(generateFakeUser())
        const foundUser = await UserDb.findByEmail(createdUser.email);
        
        expect(foundUser).toBeDefined();
        expect(foundUser._id).toStrictEqual(createdUser._id);
        expect(foundUser.email).toBe(createdUser.email);
        done();
    });

    it("Should update an user by id", async (done) => {
        const createdUser = await UserDb.insert(generateFakeUser())
        const updates = { firstname: "Hello", lastname: "World" }
        const updatedUser = await UserDb.updateById(createdUser._id, updates);
        
        expect(updatedUser).toBeDefined();
        expect(updatedUser._id).toStrictEqual(createdUser._id);
        expect(updatedUser.firstname).toBe(updates.firstname);
        expect(updatedUser.lastname).toBe(updates.lastname);
        done();
    });

    it("Should delete an user by Id", async (done) => {
        const createdUser = await UserDb.insert(generateFakeUser())
        const removedUser = await UserDb.removeById(createdUser._id);
        
        expect(removedUser).toBeDefined();
        expect(removedUser._id).toStrictEqual(createdUser._id);
        done();
    });
});