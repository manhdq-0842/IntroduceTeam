# -*- coding: utf-8 -*-

from odoo.addons.website.controllers.main import Website

from odoo import http
from odoo.http import request


def get_home_info():
    odoo = request.env['product.template'].sudo().search([('x_type', '=', 'introduce_odoo')])
    product = request.env['product.template'].sudo().search([('x_type', '=', 'complete_product')])
    solution = request.env['product.template'].sudo().search([('x_type', '=', 'solution')])
    customer = request.env['product.template'].sudo().search([('x_type', '=', 'customer')])
    user = request.env['res.users'].sudo().search([('company_ids', '=', 'OInsight')])
    experience = request.env['introduce.experience'].sudo().search([])
    teams = request.env['res.company'].sudo().search([('x_id', '=', '1')])
    menu_parent = request.env['product.public.category'].sudo().search([('parent_id', '=', False)])

    if len(teams) > 0:
        team = teams[0]

    menu_customs = []
    for item in menu_parent:
        menu_item = {
            "parent": item,
            "childs": request.env['product.public.category'].search([('parent_id', '=', item.id)])
        }
        menu_customs.append(menu_item)

    return {
        'menu': menu_customs,
        'team': team,
        'experience': experience,
        'user': user,
        'product': product,
        'customer': customer,
        'solution': solution,
        'odoo': odoo,
    }


class Homepage(Website):
    @http.route('/', type='http', auth="public", website=True)
    def homepage(self, **kw):
        return http.request.render('introduce_company.homepage', get_home_info())

    @http.route('/vi', type='http', auth='public', method='POST', website=True)
    def get_homepage(self):
        info = get_home_info()
        info.update({'vi': True})
        return request.env['ir.ui.view'].render_template('introduce_company.homepage', info)

    @http.route('/question', website=True, type='json', auth='public', methods=['POST'])
    def create_question(self, **kw):
        vals = {
            'name': kw['kwargs']['name'],
            'phone': kw['kwargs']['phone'],
            'email': kw['kwargs']['email'],
            'question': kw['kwargs']['question'],
        }
        check = request.env['introduce.question'].sudo().create(vals)
        if check:
            return {'success': 1}
        return {'success': 0}
