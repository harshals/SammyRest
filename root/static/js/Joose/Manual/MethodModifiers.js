/**

NAME
====

Joose.Manual.MethodModifiers - Joose's method modifiers


WHAT IS A METHOD MODIFIER?
==========================

Joose provides a feature called "method modifiers". You can also think of these as "hooks" or "advice".

It's probably easiest to understand this feature with a few examples:

        Class('Person', {
            
            methods : {
                eat : function (food) {
                    console.log('yummy')
                    
                    return 'yummy'
                }
            }
        })
        
        Class('Person.Tidy', {
            isa : Person,
            
            before : {
                eat : function (food) {
                    this.washHands()
                }
            },
            
            after : {
                eat : function (food) {
                    this.brushTeeth()
                }
            },
            
            methods : {
                washHands : function (food) {
                    console.log('washing hands')
                },
                
                brushTeeth : function (food) {
                    console.log('brushing teeth')
                }
            }
        })

Now if I call `new Person.Tidy().eat('apple')` I'll get the following output:

        washing hands
        yummy
        brushing teeth

You probably could have figured that out from the names "before" and "after"

Method modifiers are applied in the order they appears in the class's declaration. 

**NOTE FOR RHINO USERS:**
Since Rhino travers object properties in random order, if you'll provide more than one modifier for some method in a class, you may receive ambigous results.

WHY USE THEM?
=============

Method modifiers have many uses. Generally, they simplify class logic, making it more "natural" and descriptable in natural words.
 
Another very common use of method modifiers is in roles. This lets roles alter the behavior of methods in the classes that use them. See [Joose.Manual.Roles][roles] for more information about roles.

Since modifiers are mostly useful in roles, some of the examples below are a bit artificial. They're intended to give you an idea of how modifiers work, but may not be the most natural usage.


BEFORE and AFTER
================

These method modifiers can be used to adjust the behavior of some method, usually inherited from superclass, or defined in the consuming class (in case of Roles).
In both cases the returning value still returns from original method, not from modifier. Return values of modifiers are ignored.

Using the declaration above:

        var tidyPerson = new TidyPerson()
        var res = tidyPerson.eat('apple')
        
        console.log(res == 'yummy') # returns 'yummy' from the inherited method

Another use for the 'before' modifier would be to do some sort of prechecking on a method call or setter. For example:

        Class('Bus', {
            isa : Vehicle,
            
            before : {
                openDoors : function () {
                    if (this.isMoving()) throw "Can't open the bus's doors during movement"
                }
            }
        })

This lets us implement logical checks that don't make sense as type constraints. In particular, they're useful for defining logical rules about an object's state changes.

Similarly, an 'after' modifier could be used for logging an action that was taken, and so on.


OVERRIDE and AROUND
===================

An 'override' and 'around' modifiers are a bit more powerful than either a 'before' or 'after' modifier. It can modify the arguments being passed to the original method, 
and you can even decide to simply not call the original method at all. You can also modify the return value of the original method.

        Class('Person', {
            has : {
                firstName : { is : 'rw' },
                lastName : { is : 'rw' }
            },
            
            methods : {
                getDisplayName : function (lastNameFirst) {
                    if (lastNameFirst) return this.lastName + ', ' + this.firstName  
                    
                    return this.firstName + ' ' + this.lastName
                },
                
                chatOnIRC : function (partner, message) {
                    return this.type(partner + ': ' + message)
                }
            }
        })
        
        
        Class('Employee', {
            isa : Person,
            
            has : {
                jobTitle : { is : 'rw' }
            },
        
            override : {
                getDisplayName : function (lastNameFirst) {
                    return this.SUPER(false) + ', ' + this.jobTitle 
                }
            },
            
            around : {
                chatOnIRC : function (original, partner, message) {
                    return this.getDistanceToBoss() >= 5 ? original(partner, message) : false
                }
            }
        })

An 'override' modifier allows you to use the `this.SUPER(arg1, arg2, ...)` call in the modifier. As expected this call will execute the original method with provided arguments.
Its possible also to specify the arguments in the "packed" form, as array, with `this.SUPERARG(argumentsArray)`. This variant is usually used as `this.SUPERARG(arguments)` and is an
equivalent for `this.SUPER.apply(this, arguments)`.

An 'around' modifier receives the original method as its first argument, then any arguments passed to the original method.

  
AUGMENT
=======

The augment modifier provides a sort of inverted subclassing. You provide part of the implementation in a superclass, and then document that subclasses are expected to provide the rest.

The superclass calls `this.INNER()`, which then calls the 'augment' modifier in the subclass:


        Class('Document', {
        
            methods : {
                as_xml : function () {
                    var xml = "<document>\n"
                    xml += this.INNER()
                    xml += "</document>\n"
                    
                    return xml
                }
            }
        })

Using `this.INNER()` in this method makes it possible for one or more subclasses to then augment this method with their own specific implementation:

        Class('Report', {
            isa : Document,
            
            augment : {
                as_xml : function () {
                    var xml = "<report>\n"
                    xml += this.INNER()
                    xml += "</report>\n"
            
                    return xml
                }
            }
        })

When we call `as_xml` on a `Report` object, we get something like this:

          <document>
          <report>
          </report>
          </document>

But we also called `this.INNER()` in `Report`, so we can continue subclassing and adding more content inside the document:

        Class('Report.IncomeAndExpenses', {
            isa : Report,
            
            augment : {
                as_xml : function () {
                    var xml = '<income>' + this.income + '</income>\n'
        
                    xml += '<expenses>' + this.expenses + '</expenses>\n'
                    
                    xml += this.INNER() || ''
            
                    return xml
                }
            }
        })


Now our report has some content:

          <document>
          <report>
          <income>$10</income>
          <expenses>$8</expenses>
          </report>
          </document>

What makes this combination of `augment` and `this.INNER()` special is that it allows us to have methods which are called from parent (least specific) to child (most specific). This inverts the normal inheritance pattern.

Note that in `Report.IncomeAndExpenses` we call `this.INNER()` again. If the object is an instance of `Report.IncomeAndExpenses` then this call is a no-op, and just returns `undefined`.
However, if later we will decide to further subclass the `Report.IncomeAndExpenses`, than its `as_xml` will still include the content, provided by subclass.


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

[roles]: Roles.html

*/
