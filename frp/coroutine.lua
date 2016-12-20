
function foo()
  print('hello')
  coroutine.yield()
  print('world')
end

local bar = coroutine.create(foo)

coroutine.resume(bar)
print('main, not in `foo()')
coroutine.resume(bar)

-- @https://electronic-blue.herokuapp.com/blog/2012/06/coroutine-an-introduction/
