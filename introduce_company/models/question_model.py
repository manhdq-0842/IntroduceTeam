# -*- coding: utf-8 -*-
from datetime import datetime

from odoo import models,fields


class Question(models.Model):
    _name = 'introduce.question'

    name = fields.Char(string="Name")
    phone = fields.Char(string='Phone')
    email = fields.Char(string='Email')
    question = fields.Text(string='Question')


class ReceiveEmail(models.Model):
    _name = 'introduce.email'

    email = fields.Char(string='Email')
