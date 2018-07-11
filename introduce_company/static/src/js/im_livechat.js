odoo.define('introduce_company.im_livechat', function (require) {
    var time = require('web.time');
    var ajax = require('web.ajax');
    var LivechatButton = require('im_livechat.im_livechat').LivechatButton;
    LivechatButton.include({
        add_message: function (data, options) {
            var msg = {
                id: data.id,
                attachment_ids: data.attachment_ids,
                author_id: data.author_id,
                body: data.body,
                date: moment(time.str_to_datetime(data.date)),
                is_needaction: false,
                is_note: data.is_note,
                customer_email_data: []
            };

            // Compute displayed author name or email
            msg.displayed_author = msg.author_id && msg.author_id[1] ||
                this.options.default_username;

            // Compute the avatar_url
            msg.avatar_src = this.server_url;
            if (msg.author_id && msg.author_id[0]) {
                msg.avatar_src += "/introduce_company/static/src/img/logo.png";
            } else {
                msg.avatar_src += "/mail/static/src/img/smiley/avatar.jpg";
            }
            if (options && options.prepend) {
                this.messages.unshift(msg);
            } else {
                this.messages.push(msg);
            }
        },
    })
});