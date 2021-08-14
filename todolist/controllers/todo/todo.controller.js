module.exports.get = (req,res,next) => {
    try {
        const todos = [
            {
                nickname : "nickname_1",
                password : "password_1"
            },
            {
                nickname : "nickname_1",
                password : "password_1"
            },
            {
                nickname : "nickname_1",
                password : "password_1"
            }
        ]
        return res.json({ todos });
    } catch (err) {
        next(err);
    }
}