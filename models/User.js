const db = new Map();

class User {
    constructor({firstName, lastName, email, password, isSubscribed = false}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isSubscribed = isSubscribed;
        this.id = db.size + 1;
        this.createdAt = new Date();

        return Promise.resolve(this);
    }

    async save () {
        db.set(this.id, this);
        return this;
    }

    async update(updateValues) {
        const oldUser = db.get(this.id);
        const newUser = await new User({...oldUser, ...updateValues});
        db.set(this.id, newUser);
        return newUser;
    }

    async delete () {
        return db.delete(this.id);
    }

    async authorise (accountData) {
        const user = db.get(this.id);
        if(user.email === accountData.email && user.password === accountData.password){
            return user;
        } else {Error}
    }

    static async findOne(id){
        return db.get(id);
    }

    static async findAll(){
        return [...db.values()];
    }

}

module.exports = User;