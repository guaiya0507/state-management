# -*- coding: utf8 -*-

def foo():
  for i in range(10):
    yield i
    print u'foo: Coroutine'

bar = foo()

print bar.next()
print u'main: MainThread'
print bar.next()
print u'main: MainThread: hello world'

# @references http://blog.ez2learn.com/2010/07/17/talk-about-coroutine-and-gevent/


