/*

   jQPluginify v0.1
   By: Adam Jaret (http://atj.me)

   Create jQuery plugins with abstracted boilerplate code.

   Usage: jQPluginify.CreatePlugin(pluginName, defaultOptions, methods)

   Example:

      // File: jquery.myplugin.js
      (function($){
         var methods = {
           "_initialize": function() {
             // Anything your plugin needs to do when first loading
             // Access options using this.settings
             var options = this.settings;
             // Access element using this.$el
             this.$el.click(this.handleClick);
             // Find a child element (this is a shortcut for this.$el.find('.child-element'))
             var child = this.$('.child-element');
           }
           ,"handleClick": function(ev) {
             ev.preventDefault();
             console.log('click!');
             this.test(0);
           }
           ,"test": function(n) {
             console.log('here! '+n);
           }
         };
         jQPluginify.CreatePlugin('myplugin', {}, methods);
      })(jQuery);

      // File: main.js
      ...
      // Initialize plugin (like using any other jQuery plugin)
      $('.my-element').myplugin();
      
      // Execute a method by passing it's name and any parameters
      // Note: method names starting with _ are considered private and will not be called
      $('.my-element').myplugin('test', 1);
      ...

      // File: index.html
      ...
      <script type="text/javascript" src="js/jquery.js" />
      <script type="text/javascript" src="js/jquery.pluginify.js" />
      <script type="text/javascript" src="js/jquery.myplugin.js" />
      <script type="text/javascript" src="js/main.js" />
      ...

*/


var jQPluginify = function(){};
jQPluginify.CreatePlugin = function(pluginName, defaultOptions, methods)
{
  var jQPlugin = function(el, options)
  {
    // Defaults + options
    this.settings = $.extend({}, defaultOptions, options || {});
    
    // Store reference to element in instance    
    this.$el = $(el);
        
    // Store instance in data for element
    this.$el.data(pluginName, this);
    
    // Add plugin name as css class to element (not strictly necessary)
    this.$el.addClass(pluginName);

    // Initialize instance
    this._initialize();
  };

  $.extend(jQPlugin.prototype, {

    $: function(o)
    {
      return this.$el.find(o);
    }
    
    ,_initialize: function()
    {
      // Pass your own _initialize function in methods parameter to override
    }

    ,setOptions: function(options)
    {
        $.extend(this.settings, options || {});
    }
            
  }, methods);
  
  $.fn[pluginName] = function(options)
  {
    var returnValue = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var isMethodCall = (typeof options === "string");
    if (isMethodCall)
    {
      this.each(function() {
        var instance = $.data(this, pluginName);
        if (!instance) {
          return $.error("Cannot call methods on " + pluginName + " prior to initialization" +
                          " (attempted to call method '" + options + "').");
        }
        if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
          return $.error("Method '" + options + "' is either private or not defined by " + pluginName + ".");
        }
        var methodValue = instance[ options ].apply(instance, args);
        if (methodValue !== instance &&  methodValue !== undefined) {
          returnValue = methodValue;
          return false;
        }
      });
    } else {
      this.each(function() {
        new jQPlugin(this, options);
      });
    }
    return returnValue;
  };

}; // CreatePlugin
