const mongoose = require('mongoose');
mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

const newTodo = Todo({
    text: 'cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Saved todo -', doc);
}, (e) => {
    console.log('Unable to save Todo');
});

const otherTodo = Todo({
    text: 'Feed the cat',
    completed: true,
    completedAt: 123
});

otherTodo.save().then((doc) => {
    console.log(JSON.stringify(otherTodo, undefined, 2));
}, (e) => {
    console.log(e);
});
