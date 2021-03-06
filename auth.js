const db = require('./db/models')

const loginUser = async (req, res, user) => {
    req.session.auth = {
        userId: user.id
    };
};

const restoreUser = async (req, res, next) => {
    if (req.session.auth) {
        const { userId } = req.session.auth;

        try {
            const user = await db.User.findByPk(userId);

            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        } catch (error) {
            res.locals.authenticated = false;
            next(error);
        }
    } else {
        res.locals.authenticated = false;
        next();
    };
};

const logoutUser = (req, res) => {
    delete req.session.auth;
}

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) return res.redirect('/user/login');
    else return next();
}

const checkPerms = (comment, currUser) => {
    if (comment.user_id === currUser.id) return true;
    else return false;
}

// const checkPermissions = (book, currentUser) => {
//     if (book.userId !== currentUser.id) {
//         const err = new Error('Illegal operation.');
//         err.status = 403; // Forbidden
//         throw err;
//     }
// };

module.exports = {
    loginUser,
    restoreUser,
    logoutUser,
    requireAuth,
    checkPerms
};
