# -*- coding: utf-8 -*-

from odoo import models, fields, api
from website_introduce.source_lead_website.untils.until import Until


class Question(models.Model):
    _name = 'source_lead_website.contact_us'

    name = fields.Char(string="Name")
    phone = fields.Char(string='Phone')
    email = fields.Char(string='Email')
    address = fields.Char(string='Address')
    question = fields.Text(string='Question')
    status = fields.Selection(selection=[('wait', 'Wait'), ('in_progress', 'In Progress'), ('done', 'Done')],
                              copy=False, index=True, track_visibility='onchange', default='wait', readonly=True)

    @api.multi
    def action_confirm(self):
        """ change status wait => in_progress"""
        self.ensure_one()
        if self.status == 'wait':
            self.status = 'in_progress'

    @api.multi
    def action_done(self):
        """ change status in_progress => done"""
        self.ensure_one()
        if self.status == 'in_progress':
            self.status = 'done'


class EmaiConfig(models.TransientModel):
    _inherit = 'res.config.settings'
    _name = 'email.config'

    isShowName = fields.Boolean(string="Show Name", default=True)
    isShowPhone = fields.Boolean(string="Show Phone", default=True)
    isShowEmail = fields.Boolean(string="Show Email", default=True)
    isShowAddress = fields.Boolean(string="Show Address", default=True)
    isShowQuestion = fields.Boolean(string="Show Question", default=True)
    isCheckEmail = fields.Boolean(string="Check Email", default=True)
    isCheckPhone = fields.Boolean(string="Check Phone", default=True)

    backgroundColor = fields.Char(string="Background Color", default="#ff0000")
    textColor = fields.Char(string="Text Color", default="#ff0000")
    btnColor = fields.Char(string="Button Color", default="#ff0000")
    txtBtnColor = fields.Char(string="Text Button Color", default="#ff0000")

    position = fields.Selection(selection=(['leftmid', 'Left Mid'], ['leftbottom', 'Left Bottom'], ['rightbottom', 'Right Bottom'], ['rightmid', 'Right Mid']), default="leftbottom")

    txtHeader = fields.Char(string="Text Header", default="Contact Us")
    txtBtn = fields.Char(string="Text Button", default="Submit")

    @api.model
    def get_values(self):
        res = super(EmaiConfig, self).get_values()
        res.update(
            isShowName=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isShowName', default=True))),
            isShowPhone=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isShowPhone', default=True))),
            isShowEmail=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isShowEmail', default=True))),
            isShowAddress=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isShowAddress', default=True))),
            isShowQuestion=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isShowQuestion', default=True))),
            isCheckEmail=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isCheckEmail', default=True))),
            isCheckPhone=Until.convert_boolean_string((self.env['ir.config_parameter'].sudo().get_param('email_config.isCheckPhone', default=True))),

            backgroundColor=(self.env['ir.config_parameter'].sudo().get_param('email_config.backgroundColor', default="#ff0000")),
            textColor=(self.env['ir.config_parameter'].sudo().get_param('email_config.textColor', default="#ff0000")),
            btnColor=(self.env['ir.config_parameter'].sudo().get_param('email_config.btnColor', default="#ff0000")),
            txtBtnColor=(self.env['ir.config_parameter'].sudo().get_param('email_config.txtBtnColor', default="#ff0000")),

            position=(self.env['ir.config_parameter'].sudo().get_param('email_config.position')),

            txtHeader=(self.env['ir.config_parameter'].sudo().get_param('email_config.txtHeader', default="Contact Us")),
            txtBtn=(self.env['ir.config_parameter'].sudo().get_param('email_config.txtBtn', default="Submit")),

        )
        return res

    @api.multi
    def set_values(self):
        super(EmaiConfig, self).set_values()
        self.env['ir.config_parameter'].sudo().set_param('email_config.isShowName', self.isShowName)
        self.env['ir.config_parameter'].sudo().set_param('email_config.isShowPhone', self.isShowPhone)
        self.env['ir.config_parameter'].sudo().set_param('email_config.isShowEmail', self.isShowEmail)
        self.env['ir.config_parameter'].sudo().set_param('email_config.isShowAddress', self.isShowAddress)
        self.env['ir.config_parameter'].sudo().set_param('email_config.isShowQuestion', self.isShowQuestion)
        self.env['ir.config_parameter'].sudo().set_param('email_config.isCheckEmail', self.isCheckEmail)
        self.env['ir.config_parameter'].sudo().set_param('email_config.isCheckPhone', self.isCheckPhone)

        self.env['ir.config_parameter'].sudo().set_param('email_config.backgroundColor', self.backgroundColor)
        self.env['ir.config_parameter'].sudo().set_param('email_config.textColor', self.textColor)
        self.env['ir.config_parameter'].sudo().set_param('email_config.btnColor', self.btnColor)
        self.env['ir.config_parameter'].sudo().set_param('email_config.txtBtnColor', self.txtBtnColor)

        self.env['ir.config_parameter'].sudo().set_param('email_config.position', self.position)

        self.env['ir.config_parameter'].sudo().set_param('email_config.txtHeader', self.txtHeader)
        self.env['ir.config_parameter'].sudo().set_param('email_config.txtBtn', self.txtBtn)
