Ext.namespace('Ext.ux');
/**
 * <p>ButtonIconMenu is a button that allows a pre-defined selection of icons to be selected via a selector menu, or by cycling through the configured icons/values.</p> <p>ButtonIconMenu is a button that allows a pre-defined selection of icons to be selected via a selector menu, or by cycling through the configured icons/values (if cycleMode is set to true)</p>
 *
 * @author <a href="https://github.com/danhumphrey">Dan Humphrey</a>
 * @class Ext.ux.ButtonIconMenu
 * @extends Ext.Button
 * @constructor
 * @component
 * @version 1.3
 *
 */
Ext.ux.ButtonIconMenu = function(config){
    Ext.apply(this,config);
    this.addEvents(
        /**
         * Fires before the selection menu is shown. Return false from the callback function to prevent the menu from being displayed.
         * @event beforeshowmenu
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} val The current value of the ButtonIconMenu
         */
        'beforeshowmenu',
        /**
         * Fires before the ButtonIconMenu is changed via a menu selection. Return false from the callback function to prevent the value from cycling.
         * @event beforemenuselect
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} val The current value of the ButtonIconMenu
         * @param {Mixed} newVal The new value that will be set by the menu selection
         */
        'beforemenuselect',
         /**
         * Fires after a menu selection is made.
         * @event menuselect
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} oldVal The old value of the ButtonIconMenu
         * @param {Mixed} newVal The new value of the ButtonIconMenu
         */
        'menuselect',
        /**
         * Fires before the ButtonIconMenu is cycled to the next value. Return false from the callback function to prevent the value from cycling.
         * @event beforecycle
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} val The current value of the ButtonIconMenu
         * @param {Mixed} newVal The new value that will be set by the cycle operation
         */
        'beforecycle',
         /**
         * Fires after an icon is cycled to a new value.
         * @event cycle
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} oldVal The old value of the ButtonIconMenu
         * @param {Mixed} newVal The new value of the ButtonIconMenu
         */
        'cycle',
         /**
         * Fires after the icon/value is changed.
         * @event change
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} oldVal The old value of the ButtonIconMenu
         * @param {Mixed} newVal The new value of the ButtonIconMenu
         */
        'change',
        /**
         * Fires before the ButtonIconMenu value is set to the default. Return false from the callback function to prevent the default value from being set.
         * @event beforesetdefault
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} val The current value of the ButtonIconMenu
         * @param {Mixed} def The new value that will be set (the default value)
         */
        'beforesetdefault',
        /**
         * Fires after the ButtonIconMenu value is set to the default.
         * @event setdefault
         * @memberOf Ext.ux.ButtonIconMenu
         * @param {ButtonIconMenu} this This ButtonIconMenu component instance
         * @param {Mixed} val The current value of the ButtonIconMenu
         * @param {Mixed} def The new value that was set (the default value)
         */
        'setdefault'
    );
    Ext.ux.ButtonIconMenu.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.ButtonIconMenu, Ext.Button, {
    /**
     * @cfg {String} blankIcon A path to an image that will be displayed when the underlying record data for the bound field is blank (null or empty string).
     */
    blankIcon : '',
    /**
     * @cfg {String} blankIconCls The css class to apply when the underlying record data for the bound field is blank (null or empty string).
     */
    blankIconCls : '',
    /**
     * @cfg {String} blankQTip A qtip to be displayed over the icon when the underlying record data data for the bound field is invalid/unexpected. defaults to ''.
     */
    blankQTip : '',
    /**
     * @cfg {String} blankQTitle A qtitle to be displayed over the icon when the underlying record data data for the bound field is invalid/unexpected. defaults to ''.
     */
    blankQTitle : '',
    /**
     * @cfg {Boolean} cycleMode When set to true, left-clicking the ButtonIconMenu will cycle the underlying record data to the next value. Defaults to false.
     */
    cycleMode: false,
    /**
     * @cfg {String} defaultValue A string corresponding to the value of an icon config. When set, Ctrl+Click will always set this value.
     */
    defaultValue : '',
    /**
     * @cfg {String} defaultMenuPosition A string that specifies the position that the 'default' item appears within the menu. Valid values are 'top', 'bottom' or 'inline'. Defaults to 'inline'.
     */
    defaultMenuPosition : 'inline',
    /**
     * @cfg {String} extraMenuCls An extra CSS class to apply to the menu to allow for additional styling. Defaults to 'x-buttoniconmenu-menu'.
     */
    extraMenuCls : 'x-buttoniconmenu-menu',
    /**
     * @cfg {Boolean} handleEmptyAndNull When set to true, null values and exmpty strings will be handled as special case and given the blankIcon and blankIconCls properties. 
     * When set to false, these values must be handled explicitly in the icons array or they will be treated as invalid values.
     */
    handleEmptyAndNull : true,
    /**
     * @cfg {String} iconField When used with the store config, The field name in the store of the 'icon' icon config.
     */
    iconField : 'icon',
    /**
     * @cfg {String} iconClsField When used with the store config, The field name in the store of the 'iconCls' icon config.
     */
    iconClsField : 'iconCls',
    /**
     * @cfg {Array} icons An Array of icon configurations.
     */
    icons : [],
    /**
     * @cfg {Number} iconHeight The height of the icons.
     */
    iconHeight : 16,
    /**
     * @cfg {Number} iconWidth The width of the icons.
     */
    iconWidth : 16,
    /**
     * @cfg {String} inCycleField When used with the store config, The field name in the store of the 'inCycle' icon config.
     */
    inCycleField : 'inCycle',
    /**
     * @cfg {String} inMenuField When used with the store config, The field name in the store of the 'inMenu' icon config.
     */
    inMenuField : 'inMenu',
    /**
     * @cfg {String} invalidIcon A path to an image that will be displayed when the underlying record data for the bound field is invalid/unexpected.
     */
    invalidIcon : '',
    /**
     * @cfg {String} invalidIconCls The css class to apply when the underlying record data for the bound field is invalid/unexpected as per the icons/values defined in the icons config.
     */
    invalidIconCls : '',
    /**
     * @cfg {String} invalidQTip A qtip to be displayed over the icon when the underlying record data data for the bound field is invalid/unexpected. defaults to ''.
     */
    invalidQTip : '',
    /**
     * @cfg {String} invalidQTitle A qtitle to be displayed over the icon when the underlying record data data for the bound field is invalid/unexpected. defaults to ''.
     */
    invalidQTitle : '',
    /**
     * @cfg {String} qTipClass A class to be applied to any qtips generated by this component.
     */
    qTipClass : '',
    /**
     * @cfg {String} qTipField When used with the store config, the field name in the store of the 'qtip' icon config.
     */
    qTipField : 'qtip',
    /**
     * @cfg {String} qTitleField When used with the store config, the field name in the store of the 'qtitle' icon config.
     */
    qTitleField : 'qtitle',
    /**
     * @cfg {Boolean} rightClickDisplaysMenu When set to true, right-clicking the icon will display the selector menu.
     */
    rightClickDisplaysMenu : true,
    /**
     * @cfg {String} selectableField When used with the store config, The field name in the store of the 'selectable' icon config.
     */
    selectableField : 'selectable',
    /**
     * @cfg {Boolean} showTooltips When true, tooltips will be shown.
     */
    showTooltips : true,
    /**
     * @cfg {Store} store An optional store that provides the icon configs.
     */
    store : null,
    /**
     * @cfg {String} textField When used with the store config, The field name in the store of the 'text' icon config.
     */
    textField : 'text',
    /**
     * @cfg {String} value The initial icon value. Defaults to null in which case the defaultIcon will be used if it exists.
     */
    value : null,
    /**
     * @cfg {String} valueField When used with the store config, The field name in the store of the 'value' icon config.
     */
    valueField : 'value',
    initComponent : function(){
        if(this.store){
            if(this.store.getCount() > 0){
                this.createStoreIcons();
            }else{
                this.store.on('load', function(){
                    this.createStoreIcons();
                }, this);
                this.store.load();
            }
        }else{
            this.value = this.value || this.defaultValue;
            this.renderIcon(this.lookupIconByValue(this.value));
        }
        Ext.getDoc().on('contextmenu', this.onContextMenu, this);  
        Ext.getDoc().on('mouseup', this.onDocMouseUp, this);
        Ext.ux.ButtonIconMenu.superclass.initComponent.call(this);
    },
    setValue : function(val){
        this.value = val;
        if(this.store){
            if(this.store.getCount() > 0){
                this.renderIcon(this.lookupIconByValue(this.value));    
            }
            
        }else{
            this.renderIcon(this.lookupIconByValue(this.value));
        }
    },
    getValue : function() {
        return this.value;  
    },
    createStoreIcons : function(){
        if(this.store.getCount() === 0){
            return;
        }
        var f = this.store.fields;
        this.store.each(function(r){
            this.icons.push({
                value : r.get(this.valueField),
                text : r.get(this.textField),
                inMenu : f.containsKey(this.inMenuField) ?  r.get(this.inMenuField) : true,
                inCycle : f.containsKey(this.inCycleField) ? r.get(this.inCycleField) : true,
                icon : f.containsKey(this.iconField) ?  r.get(this.iconField) : '',
                iconCls : f.containsKey(this.iconClsField) ? r.get(this.iconClsField) : '',
                selectable : f.containsKey(this.selectableField) ? r.get(this.selectableField) : true,
                qtip : f.containsKey(this.qTipField) ? r.get(this.qTipField) : '',
                qtitle : f.containsKey(this.qTitleField) ? r.get(this.qTitleField) : ''
            });        
        }, this);
        
        this.value = this.value || this.defaultValue;
        this.renderIcon(this.lookupIconByValue(this.value));
    },
    lookupIconByValue : function(value){
        var ret;
        Ext.each(this.icons,function(i){
            if(value === i.value){ 
                ret = i;
                return false;
            }
        },this);
        
        return ret;
    },
    renderIcon : function(i){
        this.setIcon('');
        this.setIconClass('');
        this.setTooltip('');
        if(i){
            if(i.icon){
                this.setIcon(i.icon);
            }else if(i.iconCls){
                this.setIconClass(i.iconCls)
            }else{
                this.setIcon(Ext.BLANK_IMAGE_URL);
            }
            if(this.showTooltips && i.qtip){
                this.setTooltip({
                    cls : this.qTipClass,
                    text : i.qtip || '',
                    title : i.qtitle || ''
                });
            }
        }else{
            if(this.handleEmptyAndNull && (this.value === null || this.value === '')){
                this.setIcon(this.blankIcon || Ext.BLANK_IMAGE_URL);
                this.setIconClass(this.blankIconCls || '');
                if(this.blankQTip && this.showTooltips){
                    this.setTooltip({
                        qclass : this.qTipClass,
                        qtip : this.blankQTip,
                        qtitle : this.blankQTitle
                    });
                }
            }else{
                this.setIcon(this.invalidIcon || Ext.BLANK_IMAGE_URL);
                this.setIconClass(this.invalidIconCls || '');
                if(this.invalidQTip && this.showTooltips){
                    this.setTooltip({
                        qclass : this.qTipClass,
                        qtip : this.invalidQTip,
                        qtitle : this.invalidQTitle
                    });
                }
            }
        }
    },
    cycleIcon : function(val){
        var newVal = this.getNextIconValue(val);
        if(this.fireEvent('beforecycle',this.value,newVal) !== false){
            this.fireEvent('cycle',this,this.value,newVal);
            this.fireEvent('change',this,this.value,newVal);
        }
        this.value = newVal;
        this.renderIcon(this.lookupIconByValue(this.value));
    },
    onMouseOver : function(e){
        if(!this.disabled){
            var internal = e.within(this.el,  true);
            if(!internal){
                this.el.addClass('x-btn-over');
                this.el.addClass('x-buttoniconmenu-over');
                if(!this.monitoringMouseOver){
                    this.doc.on('mouseover', this.monitorMouseOver, this);
                    this.monitoringMouseOver = true;
                }
                this.fireEvent('mouseover', this, e);
            }
            if(this.isMenuTriggerOver(e, internal)){
                this.fireEvent('menutriggerover', this, this.menu, e);
            }
        }
    },
    onContextMenu : function(e){
        if(e.within(this.el) ||(this.menu && e.within(this.menu.getEl()))){
            e.stopEvent();
        }
    },
    onMouseOut : function(e){
        var internal = e.within(this.el) && e.target != this.el.dom;
        this.el.removeClass('x-btn-over');
        this.el.removeClass('x-buttoniconmenu-over');
        this.fireEvent('mouseout', this, e);
        if(this.isMenuTriggerOut(e, internal)){
            this.fireEvent('menutriggerout', this, this.menu, e);
        }
    },
    onMouseDown : function(e){
        if(e.button !== 0){
            this.onClick(e);
            return;
        }
        Ext.ux.ButtonIconMenu.superclass.onMouseDown.call(this,e);
    },
    onMouseUp : function(e){
        if(e.button !== 0){
            e.stopEvent();
            return;
        }
        Ext.ux.ButtonIconMenu.superclass.onMouseUp.call(this,e);
    },
    onClick : function(e){
        if(e){
            e.stopEvent();
        }
        if(this.disabled){
            return;
        }
        if(e.button === 0){
            if(e.ctrlKey){
                var def = this.getDefaultIconValue();
                if(this.value === def){
                    return;
                }
                if(def !== undefined){
                    if(this.fireEvent('beforesetdefault',this,this.value,def) !== false){
                        this.value = def;
                        this.renderIcon(this.lookupIconByValue(this.value));
                        this.fireEvent('setdefault',this,this.value,def);
                        this.fireEvent('change',this,this.value,def);
                    }
                    this.handleClick(e);
                    return;
                }
            }
            if(this.cycleMode){
                this.cycleIcon(this.value);
                this.handleClick(e);
                return;
            }
            
        }
        
        if(this.fireEvent('beforeshowmenu',this,this.value) !== false){
            this.showMenu(this.value);
        }
        this.handleClick(e);
    },
    handleClick : function(e){
        this.fireEvent('click', this, e);
        if(this.handler){
            this.handler.call(this.scope || this, this, e);
        }
    },
    showMenu : function(val) {
        if(!this.menu){
            this.createMenu();
        }
        
        this.configureMenuItems(val);
        
        this.menu.show(this.el,'tl-tl');
        var doc = Ext.getDoc();
        doc.on('mousemove', this.onMouseMove, this);
        this.menu.on('hide',function(){
            doc.un('mousemove', this.onMouseMove, this);
        },this,{single:true});
    },
    createMenu : function(){
        this.menuItems = new Ext.util.MixedCollection();
        
        var action, actions = [],def;
        Ext.each(this.icons,function(i){
            if(i.selectable !== false && i.inMenu !== false){
                action = new Ext.Action({
                    value: i.value,
                    text : i.text,
                    handler : this.onMenuClick,
                    scope: this,
                    icon : i.icon || null,
                    iconCls : i.iconCls || null
                });
                
                this.menuItems.add(i.value,action);
                if(i.value === this.defaultValue && this.defaultMenuPosition !== 'inline'){
                    def = {};
                    def.value = i;
                    def.action = action
                    return;
                }
                actions.push(action);
            }
        },this);

        if(def){
            if(this.defaultMenuPosition === 'top'){
                actions.splice(0,0,'-');
                actions.splice(0,0,def.action);
            }else{
                actions.push('-');
                actions.push(def.action);
            }
        }
        this.menu = new Ext.menu.Menu({
            enableScrolling: false,
            items: actions,
            cls: this.extraMenuCls
        });           
    },
    configureMenuItems : function(currentVal){
        this.menuItems.eachKey(function(k,i){
            if(k === currentVal){
                i.disable();
            }else{
                i.enable();
            }
        },this);
    },
    onMenuClick : function(item,e){
        var newVal = item.value;
        if(this.fireEvent('beforemenuselect',this,this.value,newVal) !== false){
            this.fireEvent('menuselect',this,this.value,newVal);
            this.fireEvent('change',this,this.value,newVal);
        }
        this.value = newVal;
        this.renderIcon(this.lookupIconByValue(this.value));
    },
    onMouseMove : function(e,t){
        if(!e.within(this.menu.getEl(),false,true)){
            this.menu.hide();
        }
    },
    onDocMouseUp : function(e,t){
        if(this.menu && e.within(this.menu.getEl(),false,true)){
            e.stopEvent();
        }
    },
    onDestroy : function(){
        this.doc.un('mouseup', this.onDocMouseUp, this);
        this.doc.un('contextmenu', this.onContextMenu, this);
        Ext.ux.ButtonIconMenu.superclass.onDestroy.call(this);
    },
    getDefaultIconValue : function(){
        var retVal;
        Ext.each(this.icons,function(i){
            if(i.value === this.defaultValue){
                retVal = i.value;
                return false;
            }
        },this);
        return retVal;
    },
    getFirstCycleableIcon : function(){
        var retVal;
        Ext.each(this.icons,function(i){
            if(i.selectable !== false && i.inCycle !== false){
                retVal = i;
                return false;
            }
            idx++;
        },this);
        return retVal;
    },
    getNextIconValue : function(val){
        var retVal = null, idx = 0;
        Ext.each(this.icons,function(i){
            if(val == i.value){ 
                return false;
            }
            idx++;
        },this);
        idx++;
        for(var ni;idx < this.icons.length;idx++){
            ni = this.icons[idx];
            if(ni.selectable !== false && ni.inCycle !== false){
                retVal = ni.value;
                break;
            }
        }
        if(retVal === null){
            var i = this.getFirstCycleableIcon();
            if(i){
                retVal = i.value;
            }
        }
        return retVal;
    }
});
Ext.reg('buttoniconmenu', Ext.ux.ButtonIconMenu);