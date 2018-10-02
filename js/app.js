;
(function () {
	const todos = [
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
	]
	new Vue({
		el: "#todoapp",
		data: {
			todos,  //任务源数据列表
			inputText: '',  //用来绑定获取添加任务文本框的数据
			currentEdit: null,   //用来判定任务项是否获得editing样式的一个标记变量,默认为null
			backTitle: ''  // 仅仅用于备份编辑之前的title,编辑之前备份,取消编辑回退用
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
				//清空文本框
				this.inputText = ''

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
				//为了处理取消编辑,所以这里在获得编辑状态的时候先备份原title ,也就是backTitle
				this.backTitle = item.title
			},
			//失去焦点或者enter保存编辑项
			saveEdit (item,index) {
				// console.log(666)
				// 判断 被编辑的任务项的文本是否为空
				// 如果为空,直接删除该任务项
				// 如果不为空,则保存编辑,去除编辑样式
				if (item.title.trim().length === 0) {
					//执行删除操作
					this.todos.splice(index,1)
				} else {
					this.currentEdit = null
				}
			},
			//按ESC取消编辑,
			//注意:取消编辑的同时就是失去焦点,会触发onblur事件,如果使用currentEdit.title,会报错,因为cancelEdit已经让当前编辑样式设置为null 了
			cancelEdit (index) {
				// console.log("取消编辑")
				//让任务项的title回归原始数据
				this.currentEdit.title = this.backTitle
				//去除编辑样式
				this.currentEdit = null
			}
		}
	})
})()
