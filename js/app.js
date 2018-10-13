;
(function (window,Vue) {
	/*const todos = [
		{
			id: 1,
			title: '吃饭',
			done: true
		},
		{
			id: 2,
			title: '睡觉',
			done: false
		},
		{
			id: 3,
			title: '旅游',
			done: false
		},
		{
			id:4,
			title: '玩游戏',
			done: false
		},
		{
			id: 5,
			title: '敲代码',
			done: true
		}
	]*/
	//从本地存储中获取任务列表数据
	const todos = JSON.parse(window.localStorage.getItem('todos'))
	const app = new Vue({
		el: "#todoapp",
		data: {
			todos,  //任务源数据列表
			inputText: '',  //用来绑定获取添加任务文本框的数据
			currentEdit: null,  //用来判定任务项是否获得editing样式的一个标记变量,默认为null
			filterTodos: [], //取决于你点击的是谁,all/active/completed
			hash: ''
		},
		methods: {
			//增加任务项
			addTodo (e) {
				// console.log(e.keyCode)
				//拿到文本框数据(双向绑定)
				//console.log(this.inputText)
				const {todos,inputText} = this  //解构赋值
				//非空校验
				if(inputText.trim().length === 0){
					return
				}
				//添加到数组中
				//注意最后一项的id要处理一下,获取唯一的id
				//还要处理下最后一项有没有,数组是不是空的
				const lastItem = todos[todos.length-1]
				const id = lastItem ? lastItem.id + 1 : 1
				todos.push({
					id: id,
					title: this.inputText,
					done: false
				})

				//持久化添加到本地存储
				window.localStorage.setItem("todos",JSON.stringify(todos))

				//清空文本框
				this.inputText = ''
				//第二种  单绑.用到Dom
				/*
				const todos = this.todos
				const value =e.target.value
				if(!value.trim()){
					return
				}
				// 处理唯一id
				const lastItem = todos[todos.length -1]
				const id = lastItem ? lastItem.id + 1 : 1
				// 添加到数据中
				todos.push({
					id,
					title: value,
					done: false
				})
				//清空文本框
			  this.inputText = ''
        */
			},
			//删除单个任务项
			removeTodo (index) {
				// console.log(123)
				this.todos.splice(index,1)
			},
			//获得编辑样式
			getEditing (item) {
				// console.log(666)
				// 讲currentEdit 赋值为当前双击的任务项
				this.currentEdit = item
			},
			//失去焦点或者enter保存编辑项
			saveEdit (item,index,e) {
			  // console.log(item,e)
			  const value = e.target.value
				// 判断 被编辑的任务项的文本是否为空
				// 如果为空,直接删除该任务项
				// 如果不为空,则保存编辑,去除编辑样式
				if (!value.trim()) {
					//执行删除操作
					this.todos.splice(index,1)
				} else {
					item.title = value
					this.currentEdit = null //去除编辑样式
				}
			},
			//按ESC取消编辑,
			//注意:取消编辑的同时就是失去焦点,会触发onblur事件,如果使用currentEdit.title,会报错,因为cancelEdit已经让当前编辑样式设置为null 了
			cancelEdit (index) {
				// console.log("取消编辑")
				//去除编辑样式
				this.currentEdit = null
			},
			//获取所有未完成的任务数量
			// getRemaining () {
			// 	return this.todos.filter(item => !item.done).length
			// },

			//清除所有已完成任务项
			clearAllDone () {
				// console.log("事件绑定成功")
				// 在循环中删除像会出现删不干净的现象,不能用forEach,因为forEach的索引不好控制
				// 但是可以使用for循环,只要在循环中每次循环的时候 索引往回倒一次
				const todos = this.todos
				for (let i = 0; i < todos.length; i++) {
					if (todos[i].done === true) {
						//执行删除操作
						todos.splice(i,1)
						i--    //必须要让索引倒回一次,不然就删不干净
					}
				}
			}
			//切换所有已完成任务的状态
			// toggleAll (e) {
			// 	// console.dir(e.target)
			// 	const  {checked} = e.target
			// 	// this.todos.forEach(item => item.done = checked)
			// 	this.todos.forEach(function (item) {
			// 		item.done = checked
			// 	})
			// }
		},
		//计算属性选项对象
		//计算属性的本质是方法,但是只能当属性来使用,不能调用
		//计算属性非一般属性,本身不存储任何值,它的值来源于它本身的get方法
		//计算属性的完整写法:
		//  属性名: {
		//  	get: function () {},  //当访问该属性的时候,会自动调用get方法
		//  	set: function () {}   //当为属性赋值的时候,会自动调用set方法
		//  }

		//属性名: function () {}是
		//   属性名: {
		//   		get: function () {}
		//   }
		//   的简写方式
		computed: {
			remaining () {
				return this.todos.filter(item => !item.done).length
			},
			//切换所有任务项的复选框状态
			//用到every方法,它会对每一个元素执行条件判断,当每一个元素的done===true,every 会返回一个布尔值true
			//只要有一个元素的done===false,那么every方法会返回false
			toggleAllState: {
				get: function () {
					const toggleAll = this.todos.every(function (item) {
						return item.done === true
					})
					return toggleAll
				},
				set: function (val) {    //当为计算属性赋值的时候会自动调用set方法
					//获得checkbox的选中状态,遍历所有任务项,讲所有任务项的done ===checkbox的选中状态
					// console.log("val = ",val)
					this.todos.forEach(function (item) {
						item.done = val
					})
				}
			}
		},

		//watch 实例选项 ,它是一个对象,对象的key必须是要被监视的实例成员(可以是data中的数据成员,也可以是computed计算属性中的数据成员)
		//默认状态下,watch只能监视数组或者对象成员的添加或者删除,如果想要深度监视,需要配置handler
		watch: {
			todos: {
				handler: function () {  //当todos发生改变的时候会自动调用handler方法
					//当todos发生改变时,将todos数据存储到localStorage中
					window.localStorage.setItem('todos',JSON.stringify(this.todos))
				},
				deep: true  //默认只能监视对象或者数组的一层数据,如果需要无极监视,则需要配置为深度监视
			}
		}

	})
	window.app = app //把app暴露到全局,方便调试

	window.onhashchange = function () {
		// console.log("# hash改变了")
		// const hash = window.location.hash
		const { hash } = window.location

		//修改实例中的属性hash,从而影响用来过滤数据的a链接的样式
		app.hash = hash
		//根据hash 的不同过滤数据的展示
		switch(hash){
			case '#/' :
				app.filterTodos = app.todos
				break
			case '#/active' :
				app.filterTodos = app.todos.filter(function (item) {
					return item.done === false
				})
				break
			case '#/completed' :
				app.filterTodos = app.todos.filter(function (item) {
					return item.done === true
				})
				break
		}

	}
	//hash只有在改变的时候才会执行,所以需要页面第一次进来的时候手动调用一次
	//初始化过滤显示filterTodos数据      动态的根据hash,拿到过滤的数据
	window.onhashchange()
})(window,Vue)
