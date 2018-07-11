# -*- coding: utf-8 -*-

from odoo import models, fields, tools, api
from odoo.addons.base import res
from odoo.modules import get_module_resource


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    x_title = fields.Char(string="Title")
    x_title_vn = fields.Char(string="Tên VN/ Title odoo")
    x_description = fields.Text(string="Description")
    x_description_vn = fields.Text(string="Miêu tả")
    x_link = fields.Text(string="Link")
    x_type = fields.Selection(requied=True, string="Type",
                              selection=[('complete_product', 'Complete Product'), ('customer', 'Customer'),
                                         ('solution', 'Solution'), ('introduce_odoo', 'Introduce Odoo'), ('reason', 'Reason Choose Us')])


class Person(models.Model):
    _inherit = 'res.users'

    x_name_vn = fields.Char(string="Tên")
    x_job = fields.Char(string="Job")
    x_job_vn = fields.Char(string="Nghề nghiệp")
    x_facebook = fields.Char(string="Description")
    x_twitter = fields.Char(string="twitter")
    x_googleplus = fields.Char(string="Googleplus")


class MenuHeader(models.Model):
    _inherit = 'product.public.category'

    x_name_vn = fields.Char(string="Tên")
    x_link = fields.Char(string="Link")


class CustomCompany(models.Model):
    _inherit = 'res.company'

    x_partner_vn = fields.Char(string="Tên")
    x_address = fields.Char(string="Địa chỉ")
    x_description = fields.Text(string="Description")
    x_description_vn = fields.Text(string="Miêu tả")
    x_id = fields.Char(string="ID")
