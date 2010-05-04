Joose.Namespace.Manager = new Joose.Managed.Class('Joose.Namespace.Manager', {
    
    have : {
        global      : null,
        globalNs    : null,
        
        current     : null
    },
    
    
    methods : {
        
        initialize : function () {
            var global = this.global = new Joose.Namespace.Keeper('').c
            
            var globalNs = this.globalNs = global.meta.ns
            
            globalNs.container      = Joose.top
            global.meta.parentNs    = global
            
            this.current = [ global ]
        },
        
        
        getCurrent: function () {
            return this.current[0]
        },
        
        
        executeIn : function (ns, func) {
            var current = this.current
            
            var scope = ns.meta.ns ? ns.meta.ns.container : ns
            
            current.unshift(ns)
            var res = func.call(scope, ns)
            current.shift()
            
            return res
        },
        
        
        earlyCreate : function (name, metaClass, props) {
            props.constructorOnly = true
            
            return new metaClass(name, props).c
        },
        
        
        //this function establishing the full "namespace chain" (including the last element)
        create : function (nsName, metaClass, extend) {
            //if no name provided, then we creating an anonymous class, so just skip all the namespace manipulations
            if (!nsName) return new metaClass(nsName, extend).c
            
            props = extend || {}
            
            var parts = Joose.S.saneSplit(nsName, '.')
            var object  = this.getCurrent()
            var soFar   = Joose.S.saneSplit(object.meta.name, '.')
            
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i]
                var isLast = i == parts.length - 1
                
                if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
                
                var cur = (object == this.global ? this.global.meta.ns.container : object)[part]//object.meta.ns.getProperty(part)
                
                soFar.push(part)
                var soFarName = soFar.join(".")
                var needFinalize = false
                var nsKeeper
                
                if (typeof cur == "undefined") {
                    if (isLast) {
                        nsKeeper = this.earlyCreate(soFarName, metaClass, props)
                        needFinalize = true
                    } else
                        nsKeeper = new Joose.Namespace.Keeper(soFarName).c
                    
                    if (object.meta) 
                        object.meta.ns.addProperty(part, nsKeeper)
                    else
                        object[part] = nsKeeper
                    
                    cur = nsKeeper
                } else if (isLast && cur && cur.meta) {
                    //XXX needs cleanup and sanitizing
                    if (cur.meta.constructor == metaClass && extend)
                        cur.meta.extend(props)
                    else if (cur.meta instanceof Joose.Namespace.Keeper && metaClass != Joose.Namespace.Keeper) { 
                        cur.meta.plant(this.earlyCreate(soFarName, metaClass, props))
                        needFinalize = true
                    } 
                    else if (metaClass != Joose.Namespace.Keeper)
                        throw "Re-declaration of class " + soFarName + "with different meta is not allowed"
                } else 
                    if (isLast && !(cur && cur.meta && cur.meta.meta && cur.meta.meta.hasAttribute('ns'))) throw "Trying to setup module " + soFarName + " failed. There is already something: " + cur
                
                if (needFinalize) cur.meta.construct(props)
                    
                object = cur
            }
            
            return object
        },
        
        
        
//        //this function establishing the full "namespace chain" (including the last element)
//        prepareNamespace : function (nsName) {
//            
//            var parts = Joose.S.saneSplit(nsName, '.')
//            var object  = this.getCurrent()
//            var soFar   = Joose.S.saneSplit(object.meta.name, '.')
//            
//            for(var i = 0; i < parts.length; i++) {
//                var part = parts[i]
//                
//                if (part == "meta" || part == "my" || !part) throw "Module name [" + nsName + "] may not include a part called 'meta' or 'my' or empty part."
//                
//                var cur = (object == this.global ? this.global.meta.ns.container : object)[part]
//                
//                soFar.push(part)
//                
//                if (cur === undefined) {
//                    var nsKeeper = new Joose.Namespace.Keeper(soFar.join(".")).c
//                    
//                    var objectMeta = object.meta
//                    
//                    if (objectMeta && objectMeta.ns) 
//                        objectMeta.ns.addProperty(part, nsKeeper)
//                    else
//                        object[part] = nsKeeper
//                    
//                    cur = nsKeeper
//                }
//                    
//                object = cur
//            }
//            
//            if (!(object && object.meta && object.meta.ns)) throw "Trying to setup module " + soFarName + " failed. There is already something: " + object
//            
//            return object
//        },
        
        
        prepareProperties : function (name, props, defaultMeta, callback) {
            if (name && typeof name != 'string') {
                props = name
                name = null
            }
            
            var meta
            
            if (props && props.meta) {
                meta = props.meta
                delete props.meta
            }
            
            if (!meta)
                if (props && typeof props.isa == 'function')
                    meta = props.isa.meta.constructor
                else
                    meta = defaultMeta
            
            return callback.call(this, name, meta, props)
        },
        
        
        getDefaultHelperFor : function (metaClass) {
            var me = this
            
            return function (name, props) {
                return me.prepareProperties(name, props, metaClass, function (name, meta, props) {
                    return me.create(name, meta, props)
                })
            }
        },
        
        
        register : function (helperName, metaClass, func) {
            var me = this
            
            if (this.meta.hasMethod(helperName)) {
                var helper = function () {
                    return me[helperName].apply(me, arguments)
                }
                
                if (!Joose.top[helperName]) Joose.top[helperName]  = helper
                if (!Joose[helperName])     Joose[helperName]      = helper
            } else {
                var methods = {}
                
                methods[helperName] = func || this.getDefaultHelperFor(metaClass)
                
                this.meta.extend({
                    methods : methods
                })
                
                this.register(helperName)
            }
        },
        
        
        Module : function (name, props) {
            return this.prepareProperties(name, props, Joose.Namespace.Keeper, function (name, meta, props) {
                if (typeof props == 'function') props = { body : props }    
                
                return this.create(name, meta, props)
            })
        }
        
        
        
    }
    
}).c

Joose.Namespace.Manager.my = new Joose.Namespace.Manager()

Joose.Namespace.Manager.my.register('Class', Joose.Meta.Class)
Joose.Namespace.Manager.my.register('Role', Joose.Meta.Role)
Joose.Namespace.Manager.my.register('Module')