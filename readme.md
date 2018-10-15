# TodoMVC Vue

## Develop

```shell
npm install
npm run dev

```
## 需求说明

- [TodoMVC 需求说明](https://github.com/tastejs/todomvc/blob/master/app-spec.md)
- 源数组 

```shell
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
```

## 重要知识点

- ES6新增的数组方法: findIndex(),参数是一个回调函数
 + findIndex会遍历数组,对数组的每一项调用你所传递的回调函数
   当某个元素满足 你的回调函数的条件时,findIndex会停止遍历,返回该元素在数组中的索引
   如果都没有找到索引, 则返回 -1

- 计算属性
	+ 计算属性本质是方法,但是只能当属性使用,不能当方法来用
	+ 计算属性和普通属性相比,有缓存的功能,它是一种有行为的属性,第一次访问调用完毕会将结果缓存起来,下次使用的时候会从缓存中提取,不会重复调用
	+ 计算属性有值,它的值来自它本身的get方法的返回值,但是计算属性本身不能存储数据

```shell

		// 计算属性的完整写法:
		//  属性名: {
		//  	get: function () {},  //当访问该属性的时候,会自动调用get方法
		//  	set: function () {}   //当为属性赋值的时候,会自动调用set方法
		//  }

		// 属性名: function () {} 是
		//   属性名: {
		//   		get: function () {}
		//   }
		// 的简写方式
```

- 关于本地存储没有数据,页面渲染出来bug问题
 + 当用户打开界面的时候,本地存储可能没有数据,一定要给个非null的条件处理

- 自定义指令 自动获得焦点

```shell
 // 注册一个全局自定义指令 `v-focus`
		Vue.directive('focus', {
		  // 当被绑定的元素插入到 DOM 中时……
		  inserted: function (el) {
		    // 聚焦元素
		    el.focus()
		  }
		})
```
### 自定义指令的五个钩子函数
- 五个钩子函数都有两个形参(el.binding),el 就是需要操作指令的DOM元素,binding是一个对象,里面有个value,这里面就是自定义指定传入的数据
- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置,但是拿不到该指令绑定DOM的父节点

- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。在这里可以拿到该指令绑定的DOM的父节点  element.parentNode

- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但可以通过比较更新前后的值来忽略不必要的模板更新
 + 当指令所在的模板发生改变的时候会触发update 和componentUpdated两个钩子函数
 + update 访问到的是修改前的DOM
- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 + componentUpdated访问到的是修改后的DOM

- unbind：只调用一次，指令与元素解绑时调用。就是指令被卸载了


