Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: ['Users'],

    models: ['User'],

    views: ['user.Edit', 'user.List'],

    refs: [
        {
            ref: 'usersPanel',
            selector: 'panel'
        }
    ],

    init: function () {
        this.control({
            'viewport > userlist dataview': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            },
            '*[action=create]': {
                click: this.createUser
            },
            '*[action=remove]': {
                click: this.removeUser
            }
        });

        this.getUsersStore().loadPage(1);
    },

    editUser: function (grid, record) {
        var edit = Ext.create('AM.view.user.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateUser: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getUsersStore().sync();
    },

    removeUser: function (button) {
        var records = button.up('panel').getSelectionModel().getSelection();
        this.getUsersStore().remove(records);
        this.getUsersStore().sync();
    },

    createUser: function () {
        var store = this.getUsersStore();
        store.add({});
        store.sync();
        store.reload();
    }

});
