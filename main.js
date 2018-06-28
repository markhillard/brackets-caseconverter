/* jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/* global define, $, brackets */

define(function (require, exports, module) {
    'use strict';
    
    // get brackets modules
    var EditorManager = brackets.getModule('editor/EditorManager'),
        CommandManager = brackets.getModule('command/CommandManager'),
        KeyBindingManager = brackets.getModule('command/KeyBindingManager'),
        Menus = brackets.getModule('command/Menus');
        
    // handle case conversion
    function convertCase(toCase) {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            var selectedText = editor.getSelectedText();
            if (toCase === 'l') {
                selectedText = selectedText.toLowerCase();
            } else {
                selectedText = selectedText.toUpperCase();
            }
            editor._codeMirror.replaceSelection(selectedText);
        }
    }
    
    // register commands
    var TO_LOWER_CASE = 'markhillard.caseconverter.toLowerCase',
        TO_UPPER_CASE = 'markhillard.caseconverter.toUpperCase';
        
    CommandManager.register('To Lower Case', TO_LOWER_CASE, function () { convertCase('l') });
    CommandManager.register('To Upper Case', TO_UPPER_CASE, function () { convertCase('u') });
    
    // add key bindings
    KeyBindingManager.addBinding(TO_LOWER_CASE, 'Ctrl-Alt-Shift-L');
    KeyBindingManager.addBinding(TO_UPPER_CASE, 'Ctrl-Alt-Shift-U');
    
    // build context menu
    var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(TO_LOWER_CASE);
    menu.addMenuItem(TO_UPPER_CASE);
    menu.addMenuDivider();
});
