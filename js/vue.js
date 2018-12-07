var app = new Vue({
   el: '#app',
   data: {
       message: 'Hello Vue!'
   }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString()
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: false
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: '学习JavaScript' },
            { text: '学习Vue' },
            { text: '整个牛项目' }
        ]
    }
});

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});
var app7 = new Vue({
   el: '#app-7',
   data: {
        groceryList: [
            {
                id: 0,
                text: '蔬菜'
            },
            {
                id: 1,
                text: '奶酪'
            },
            {
                id: 2,
                text: '番薯'
            },

        ]
   }
});

var e1 = new Vue({
    el: '#e-1',
    data: {
        message: 'Hello'
    },
    computed: {
        reversedMessage: {
            get: function () {
                return this.message.split('').reverse().join('')
            },
            set: function (newValue) {
                var names = newValue.split('  ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    },
    methods: {
        reversedMessage1: function () {
            return this.message.split('').reverse().join('')
        }
    }
})

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        question: function (newQ, oldQ) {
            this.answer = 'Waiting for you to finish typing...'
            this.debouncedGetAnswer()
        }
    },
    created: function () {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                    vm.answer = _.capitalize(response.data.answer)
                })
                .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error
                })
        }
    }
})
Vue.component('todo-item', {
    template: `
        <li>
            {{ title }}
            <button v-on:click="$emit('remove')">Remove</button>
        </li>
    `,
    props: ['title']
})
var todoListExample = new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            {
                id: 1,
                title: 'Do the dishes',
            },
            {
                id: 2,
                title: 'Take out the trash',
            },
            {
                id: 3,
                title: 'Mow the lawn'
            }
        ],
        nextTodoId: 4
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId ++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
})