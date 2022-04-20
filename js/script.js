const todoForm = document.querySelector('#form-todo')
const author = document.getElementById('author')
const post = document.getElementById('post')
const list = document.querySelector('.todo__list')
const todoResultValue = document.getElementById('todoResultValue')


const base = {
    counter: getCounter(),
    todo: getTodoLS(),
    check(id) {
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === id) {
                base.todo[i].ready = true
            }
        }
    },
    removeItem(id) {
        let toRemoveId;
        for (let i = 0; i < base.todo.length; i++) {
            if (base.todo[i].id === id) {
                toRemoveId = base.todo[i]
                base.todo.splice(i, 1)
                break
            }
        }
        return toRemoveId != null ? 'success' : 'bad'
    },
    addTodoArray(author, post) {
        const todoItem = {
            id: 'td' + (base.counter + 1),
            author: author,
            post,
            ready: false
        }
        base.todo.push(todoItem)
        base.counter++
        console.log(base.counter)
        return todoItem
    }
}

function addTodo(e) {
    e.preventDefault()
    const authorText = author.value
    const postText = post.value
    const objTodo = base.addTodoArray(authorText, postText)

    const todoLi = createTodo(objTodo)
    list.append(todoLi)

    todoResultValue.textContent = base.todo.length
    setTodoLS()
    todoForm.reset()
}

function createTodo(objTodo) {
    const todoItem = `
        <article class="post ${objTodo.ready ?
        'post_complete' : ''
    }">
            <h3 class="post__author">${objTodo.author}</h3>
            <p class="post__todo">${objTodo.post}</p>
            <button 
                class="post__ready ${objTodo.ready ? 'as__text' : ''}"
                data-id="${objTodo.id}" 
                type="button">${objTodo.ready ? 'X' : '✔'}</button>
        </article>
    `

    const li = document.createElement('li')
    li.innerHTML = todoItem
    li.classList.add('todo__list-item')

    return li
}

function addRemoveButtons() {
    const delBtns = document.querySelectorAll('.as__text')

    delBtns.forEach((button) =>{
        if(button.hasAttribute('data-id')){
            const attr = button.getAttribute('data-id')
            console.log(attr)
            button.addEventListener('click', addRemoveCallback)
        }
    })
}

function addRemoveCallback(e) {
    const post = e.target.closest('.post')
    post.remove()
    const id = e.target.getAttribute('data-id')
    const result = base.removeItem(id)
    setTodoLS()
    console.log(result)
}

function renderTodo() {
    for (let i = 0; i < base.todo.length; i++) {
        const todoLi = createTodo(base.todo[i])
        list.append(todoLi)
    }
    todoResultValue.textContent = base.todo.length
    addRemoveButtons()
}

function checkTodo(event) {
    const btn = event.target.closest('.post__ready')
    if (btn) {
        const post = btn.closest('.post')
        post.classList.add('post_complete')
        btn.textContent = 'Х'
        const id = btn.dataset.id
        base.check(id)
        if(!btn.classList.contains('as__text')){
            btn.classList.add('as__text')
            addRemoveButtons()
        }
        setTodoLS()
    }
}

function getTodoLS() {

    if (localStorage.getItem('todo')) {
        return JSON.parse(localStorage.getItem('todo'))
    }

    return []
}

function getCounter() {
    if (localStorage.getItem('todoCounter')) {
        return  JSON.parse(localStorage.getItem('todoCounter'))
    }

    return 0
}

function setTodoLS() {

    localStorage.setItem('todo', JSON.stringify(base.todo))
    localStorage.setItem('todoCounter', JSON.stringify(base.counter))

}

renderTodo()

todoForm.addEventListener('submit', addTodo)
list.addEventListener('click', checkTodo)
