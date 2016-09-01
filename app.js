angular.module("reminderly", [
  "ui.router",
  "todo"
])
.config([
  "$stateProvider",
  Router
])


angular.module("todo", ["ngResource"])
  .controller("TodosController", [
    "TodoFactory",
    TodosController
])
  .factory("TodoFactory", [
    "$resource",
    TodoFactory
  ])

function Router($stateProvider){
  $stateProvider
  .state("todosIndex", {
    url: "/todos",
    templateUrl: "todosIndex.html",
    controller: "TodosController",
    controllerAs: "vm"
  })
}

function TodosController(TodoFactory){
  this.todos = TodoFactory.query()
  this.todo = new TodoFactory()
  this.todo.body = "hard coded like a boss"
  this.createHardCodedTodo = function(){
    this.todo.$save()
  }
  console.log("controller hit");
}

function TodoFactory($resource){
  return $resource("http://localhost:4000/todos/:id")
}
