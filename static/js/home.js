home = {
    mailSendingUrl: '/send_question_mail',

    modalWrapper: null,
    modalForm: null,

    init: function () {
        this.modalWrapper = $('#mail_modal');
        this.modalForm = $('form', this.modalWrapper);

        this.modalWrapper.on('hide.bs.modal', this.clearModal.bind(this));

        this.modalForm.on('submit', this.sendMail.bind(this));
    },

    sendMail: function (e) {
        e.preventDefault();
        let formData = this.modalForm.serializeArray();

        $('.spinner-border', this.modalForm).addClass('home_question_sending');
        $.ajax({
            url: this.mailSendingUrl,
            type: 'POST',
            data: formData,
            success: function (data) {
                this.modalWrapper.modal('hide');
            }.bind(this),
            error: function(){
                console.log('ajax error');
            }
        });
    },

    clearModal: function () {
        $('.spinner-border', this.modalForm).removeClass('home_question_sending');
        this.modalForm.closest('form').find("input[type='email'], textarea").val("");
    }
}
$(function () {
    home.init();
});
