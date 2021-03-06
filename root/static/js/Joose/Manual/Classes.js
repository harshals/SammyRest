/**

NAME
====

Joose.Manual.Classes - Making your classes use Joose (and subclassing)

USING Joose
-----------

Using Joose is very simple, just include the appropriate files in your page (see the [Joose.Manual.Installation][1] section) a type:


        Class('Person', {
        })


That's it, you've made a class with Joose!

There's actually a lot going on here under the hood, so let's step through it.

When you constructing a class with Joose, a properties of 2nd argument passed to `Class` call are called *builders*. These include things like `has`, `isa`, `does` and more. 
These builders are what you use to define your class. For example, you might define an attribute and a method:

        Class('Person', {
            has : {
                firstName : { is : 'rw' }
            },
            
            methods : {
                trimLeading : function () {
                    ...
                }
            }
        })

Attributes are described in the [Joose.Manual.Attributes][2] documentation.


When you use Joose, your class will become a subclass of `Joose.Meta.Object`. The `Joose.Meta.Object` class provides a default `initialize` method and a number of additional methods. 
You can read more about this in the [Joose][3] document.

Joose creates an instance of `Joose.Meta.Class` for your class. This metaclass instance is now available as a meta property on your class, for example: `Person.meta`

The metaclass object provides an introspection API for your class. It is also used by Joose itself under the hood to add attributes, compose roles, and so on. 
In fact, all of Joose's sugar does the real work by calling methods on this metaclass object (and other meta API objects).


ALIASES
=======

In case your global scope already contains `Class` symbol, you can use the `Joose.Class` alias to declare your classes.
There are also corresponding `Joose.Role` and `Joose.Module` aliases.


ANONYMOUS CLASSES
=================

If you'll omit the class name, Joose will create an *anonymous* class. Anonymous class behave very much the same as usual class, expect that it will not have
publically available constructor's. Its a good idea to capture this constructor in the variable:

        var anonoymous = Class({
            has : {
                firstName : { is : 'rw' }
            },
            
            methods : {
                trimLeading : function () {
                    ...
                }
            }
        })



SUBCLASSING (`isa` builder)
===========================

Joose provides a simple builder for declaring your parent class: `isa`

        Class('User', {
            isa : Person,
    
            has : {
                userName : { is : 'rw' }
            },
            
            methods : {
                trimLeading : function () {
                    this.SUPER()
                    ...
                }
            }
        })

A class inherit all the attributes and methods from its parent class, and can also re-declare (override) them. In the re-declared method you can use `this.SUPER(arg1, arg2, ...)` call to execute the same method from the parent class.
There is also another form of this call : `this.SUPERARG(arg)` In this form, arguments are passed in the array, this is the equivalent of `this.SUPER.apply(this, arg)`

Note that Joose allows a single parent class only. As cleaner alternative to multiple inheritance approach, Joose provides Roles mechanism. See [Joose.Manual.Roles][4].



AUTHOR
======

Nickolay Platonov [nickolay8@gmail.com](mailto:nickolay8@gmail.com)

Heavily based on the original content of Moose::Manual, by Dave Rolsky [autarch@urth.org](mailto:autarch@urth.org)


COPYRIGHT AND LICENSE
=====================

Copyright (c) 2008-2009, Malte Ubl, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Malte Ubl nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

[1]: Installation.html
[2]: Attributes.html
[3]: Construction.html
[4]: Roles.html

*/
