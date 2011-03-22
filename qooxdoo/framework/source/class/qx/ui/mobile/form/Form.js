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
     * Tino Butz (tbtz)

************************************************************************ */

/**
 * EXPERIMENTAL - NOT READY FOR PRODUCTION
 * Todo: Add Legend
 */
qx.Class.define("qx.ui.mobile.form.Form",
{
  extend : qx.ui.mobile.core.Widget,
  include : [ qx.ui.mobile.core.MChildrenHandling ],

  properties :
  {
    cssClass :
    {
      refine : true,
      init : "form"
    }
  },


  members :
  {
    // overridden
    _getTagName : function()
    {
      // TODO: use real form tag here
      // we need submit functionality
      return "ul";
    }
  }
});