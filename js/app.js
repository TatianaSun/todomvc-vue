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
			title: '唱歌',
			done: true
		},
		{
			id: 6,
			title: '敲代码',
			done: true
		}
	]
	new Vue({
		el: "#todoapp",
		data: {
			todos,
			inputText: ''

		},
		methods: {
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
				const id = todos[todos.length - 1].id + 1
				todos.push({
					id: id,
					title: this.inputText,
					done: false
				})
				//清空文本框
				this.inputText = ''
			}
		}
	})
})()
