/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/* ************************************************************************

#asset(feedreader/css/website.css)

************************************************************************ */

/**
 * The feed reader's website main application class.
 */
qx.Class.define("feedreader.WebsiteApplication",
{
  extend : qx.application.Native,


  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }


      // set the qooxdoo version
      document.getElementById("qxTag").innerHTML = 
        "qooxdoo " + qx.core.Environment.get("qx.version");

      // Initialize the model
      var model = new feedreader.model.Model();

      // get list and tree
      var tree = document.getElementById("tree");
      var list = document.getElementById("list");
      // fill the tree with the feeds
      this.fillTree(tree, model);

      // add a listener to the tree to change the selected feed
      var self = this;
      qx.bom.Event.addNativeListener(tree, "change", function(e) {
        var feed = qx.bom.Event.getTarget(e).feed;
        // if the selected feed is loaded
        if (feed.getState() === "loaded") {
          self.fillList(list, feed);
        } else {
          // if not loaded, add a listener 
          feed.addListener("stateModified", function(e) {
            if (e.getData() == "loaded") {
              self.fillList(list, feed);
            }
          });
        }
      });

      // load the feeds
      var loader = feedreader.io.FeedLoader.getInstance();
      loader.loadAll(model.getFeedFolder());
    },


    /**
     * Fills the given list with the data of the given feed.
     * 
     * @param el {DomNode} A DOM node which will be filled.
     * @param feed {qx.core.Object} The model for the feed.
     */
    fillList : function(el, feed) {
      // delete the current content
      el.innerHTML = "";

      /// putt all articles in the list
      var articles = feed.getArticles();
      for (var i=0; i < articles.length; i++) {
        var article = articles.getItem(i);
        el.appendChild(feedreader.website.Factory.createArticleView(article));
      };
    },


    /**
     * Fills the given tree with the data of the given model.
     * 
     * @param el {DomNode} The DOM node which will be filled.
     * @param model {qx.core.Object} The model to take the data from.
     */
    fillTree : function(el, model) {
      // empty loading text
      el.innerHTML = "";

      // take both folders
      var folders = [model.getStaticFeedFolder(), model.getUserFeedFolder()];
      var names = ["Static Feeds", "User Feeds"];

      for (var i=0; i < folders.length; i++) {
        // create a folder item in the tree
        var feeds = folders[i].getFeeds();
        el.appendChild(feedreader.website.Factory.createTreeFolder(names[i]));

        // create a feed item for every feed in the folder
        for (var j=0; j < feeds.length; j++) {
          var feed = feeds.getItem(j);
          var item = feedreader.website.Factory.createTreeItem(feed);
          // special handling for the initial selection
          if (i === 0 && j === 0) {
            // mark the first one as selected by default
            item.childNodes[0].checked = true;
            qx.bom.element.Class.add(item.childNodes[1], "selectedFeed");
            // fill the list as soon as the data is available
            var self = this;
            feed.addListener("stateModified", function(e) {
              if (e.getData() == "loaded") {
                self.fillList(document.getElementById("list"), e.getTarget());
              }
            });
          }
          el.appendChild(item);
        };
      };
    }
  }
});