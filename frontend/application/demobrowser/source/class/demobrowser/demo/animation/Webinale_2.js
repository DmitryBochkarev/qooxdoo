/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Jonathan Rass (jonathan_rass)

************************************************************************ */

qx.Class.define("demobrowser.demo.animation.Webinale_2",
{
  extend : qx.application.Standalone,

  members :
  {
    __prepareEffects : function()
    {
      this.__showEffect = new qx.fx.effect.combination.Grow(this.__dialog.getContainerElement().getDomElement());
      this.__hideEffect = new qx.fx.effect.combination.Shrink(this.__dialog.getContainerElement().getDomElement());
    },


		showDialog : function()
		{
      this.__dialog.setZIndex(1);
      this.__showEffect.start();
		},


		hideDialog : function()
		{
			this.__hideEffect.start();
		},


    main: function()
    {
      this.base(arguments);
      
      qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Modern);

      var layout = new qx.ui.layout.VBox();

      this.__container = new qx.ui.container.Composite(layout).set({
        decorator: "pane",
        padding: 16,
        backgroundColor: "pane"
      });

      this.getRoot().add(this.__container, {left:40, top:40});


      var layout2 = new qx.ui.layout.Grid(9, 5);
      layout2.setColumnAlign(0, "right", "top");
      layout2.setColumnAlign(2, "right", "top");

      var layout2 = new qx.ui.layout.Grid(3, 4);
      layout2.setColumnWidth(0, 120);
      layout2.setColumnWidth(1, 110);
      layout2.setColumnWidth(2, 110);
      layout2.setRowHeight(2, 10);
      layout2.setRowAlign(3, "center", "middle");

			var label1 = new qx.ui.basic.Label('<b "font-size:12pt;">Do you want to save the changes you made in the document "Untitled"?</b>');
			label1.setRich(true);
			
			var label2 = new qx.ui.basic.Label("Your changes will be lost if you don't save them.");

			this.__dialog = new qx.ui.container.Composite(layout2).set({
        decorator: "pane",
        padding: 16,	
        backgroundColor: "pane",
        zIndex : -1
      });
			
			this.__dialog.add(label1, { row: 0, column : 0, colSpan : 3});
			this.__dialog.add(label2, { row: 1, column : 0, colSpan : 3});
      
			
      var buttons = [
      	"Don't save",
      	"Cancel",
      	"Save..."
     	];
      
      for(var i=0; i<buttons.length; i++)
      {
      	var tmp = new qx.ui.form.Button(buttons[i]);
      	tmp.setAllowStretchX(false);
	      this.__dialog.add(tmp, {row: 3, column : i});
	      tmp.addListener("execute", this.hideDialog, this);
      }

      
      var button1 = new qx.ui.form.Button("close");
      button1.setAllowStretchX(false);
      button1.setAlignX("right");
      button1.setMarginBottom(15);

      button1.addListener("execute", this.showDialog, this);
      
      this.__container.add(button1);
      
      var text = "Lorem ipsum dolor sit amet, consectetuer sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.\n\nUt wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi";
      
      var textarea1 = new qx.ui.form.TextArea(text);

      // text area
      this.__container.add(textarea1.set({
      	width: 400,
        height: 250
      }));
      

      this.getRoot().add(this.__dialog, {
        left:65,
        top:125
      });

      this.__container.addListenerOnce("appear", this.__prepareEffects, this);

    }
  }
});
