const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

const posts = [
	{
		title: 'Post 2',
		author: 'John'
	},
	{
		title: 'Post 1',
		author: 'Jane'
	}
];

render(app, {
	root: path.join(__dirname, 'views'),
	layout: 'layout',
	viewExt: 'html',
	cache: false,
	debug: false
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async ctx => {
	await ctx.render('index', {
		title: 'Koa SSR Home',
		path: '/',
		posts: posts,
	});
});

router.get('/add-post', async ctx => {
	await ctx.render('add-post', {
		title: 'Add Post',
		path: '/add-post',
	});
});

router.post('/add-post', async ctx => {
	const { postTitle, postAuthor } = ctx.request.body;
	posts.unshift({
		title: postTitle,
		author: postAuthor
	});

	ctx.redirect('/');
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});