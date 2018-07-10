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

    # image: all image fields are base64 encoded and PIL-supported
    x_image = fields.Binary("Photo", attachment=True,
                              help="This field holds the image used as photo for the test, limited to 1024x1024px.")
    x_image_medium = fields.Binary("Medium-sized photo", attachment=True,
                                     help="Medium-sized photo of the test. It is automatically " \
                                          "resized as a 128x128px image, with aspect ratio preserved. " \
                                          "Use this field in form views or some kanban views.")
    x_image_small = fields.Binary("Small-sized photo", attachment=True,
                                    help="Small-sized photo of the test. It is automatically " \
                                         "resized as a 64x64px image, with aspect ratio preserved. " \
                                         "Use this field anywhere a small image is required.")

    def _get_default_image(self, cr, uid, context=None):
        image_path = get_module_resource('mymodule', 'static/src/img', 'default_image.png')
        return tools.image_resize_image_big(open(image_path, 'rb').read().encode('base64'))

    defaults = {
        'active': 1,
        'image': _get_default_image,
        'color': 0,
    }

    @api.model
    def create(self, vals):
        tools.image_resize_images(vals)
        return super(res.company, self).create(vals)
