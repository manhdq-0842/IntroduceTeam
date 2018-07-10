# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Question(models.Model):
    _name = 'introduce.question'

    name = fields.Char(string="Name")
    phone = fields.Char(string='Phone')
    email = fields.Char(string='Email')
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


class ReceiveEmail(models.Model):
    _name = 'introduce.email'

    email = fields.Char(string='Email')
