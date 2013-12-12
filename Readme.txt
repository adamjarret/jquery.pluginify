
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
