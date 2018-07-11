# -*- coding: utf-8 -*-

from odoo import models, fields, tools, api
from odoo.modules import get_module_resource


class Banner(models.Model):
    _name = 'introduce.banner'

    name = fields.Char(string='Name')
    name_vn = fields.Char(string='Ten')
    title = fields.Char(string='Title')
    title_vn = fields.Char(string='Tieu de')
    button = fields.Char(string='Name btn')
    button_vn = fields.Char(string='Ten btn')

    # image: all image fields are base64 encoded and PIL-supported
    image = fields.Binary("Photo", attachment=True,
                          help="This field holds the image used as photo for the test, limited to 1024x1024px.")
    image_medium = fields.Binary("Medium-sized photo", attachment=True,
                                 help="Medium-sized photo of the test. It is automatically " \
                                      "resized as a 128x128px image, with aspect ratio preserved. " \
                                      "Use this field in form views or some kanban views.")
    image_small = fields.Binary("Small-sized photo", attachment=True,
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
        return super(Banner, self).create(vals)
