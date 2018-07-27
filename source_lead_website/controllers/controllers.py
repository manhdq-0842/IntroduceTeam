# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


def get_show():
    show_name = request.env['ir.config_parameter'].sudo().get_param('email_config.isShowName')
    show_description = request.env['ir.config_parameter'].sudo().get_param('email_config.isShowDescription')
    show_phone = request.env['ir.config_parameter'].sudo().get_param('email_config.isShowPhone')
    show_email = request.env['ir.config_parameter'].sudo().get_param('email_config.isShowEmail')
    show_address = request.env['ir.config_parameter'].sudo().get_param('email_config.isShowAddress')
    show_question = request.env['ir.config_parameter'].sudo().get_param('email_config.isShowQuestion')
    backgroundColor = request.env['ir.config_parameter'].sudo().get_param('email_config.backgroundColor')
    textColor = request.env['ir.config_parameter'].sudo().get_param('email_config.textColor')
    btnColor = request.env['ir.config_parameter'].sudo().get_param('email_config.btnColor')
    txtBtnColor = request.env['ir.config_parameter'].sudo().get_param('email_config.txtBtnColor')

    position = request.env['ir.config_parameter'].sudo().get_param('email_config.position')

    txtHeader = request.env['ir.config_parameter'].sudo().get_param('email_config.txtHeader')
    txtBtn = request.env['ir.config_parameter'].sudo().get_param('email_config.txtBtn')
    txtInform = request.env['ir.config_parameter'].sudo().get_param('email_config.txtInform')
    txtSuccessTitle = request.env['ir.config_parameter'].sudo().get_param('email_config.txtSuccessTitle')
    txtSuccess = request.env['ir.config_parameter'].sudo().get_param('email_config.txtSuccess')
    txtDescription = request.env['ir.config_parameter'].sudo().get_param('email_config.txtDescription')
    return {
        'showname': show_name,
        'showdescription': show_description,
        'showphone': show_phone,
        'showemail': show_email,
        'showaddress': show_address,
        'showquestion': show_question,
        'backgroundColor': backgroundColor,
        'textColor': textColor,
        'btnColor': btnColor,
        'txtBtnColor': txtBtnColor,
        'position': position,
        'txtHeader': txtHeader,
        'txtBtn': txtBtn,
        'txtInform': txtInform,
        'txtSuccessTitle': txtSuccessTitle,
        'txtSuccess': txtSuccess,
        'txtDescription': txtDescription,
    }


class ContactAjax(http.Controller):
    @http.route('/handling-form', website=True, type='json', auth='public', methods=['POST'])
    def handling(self, **kw):
        vals = {
            'name': kw['kwargs']['name'],
            'phone': kw['kwargs']['phone'],
            'address': kw['kwargs']['address'],
            'email': kw['kwargs']['email'],
            'question': kw['kwargs']['question'],
            'checkemail': kw['kwargs']['checkemail'],
            'checkphone': kw['kwargs']['checkphone'],
        }
        check_email = request.env['ir.config_parameter'].sudo().get_param('email_config.isCheckEmail')
        check_phone = request.env['ir.config_parameter'].sudo().get_param('email_config.isCheckPhone')
        if check_email:
            if vals['checkemail']:
                emailTrue = True
            else:
                return {
                    'emailerror': 1
                }
        else:
            emailTrue = True
        if check_phone:
            if vals['checkphone']:
                phoneTrue = True
            else:
                return {
                    'phoneerror': 1
                }
        else:
            phoneTrue = True

        if emailTrue & phoneTrue:
            check = request.env['source_lead_website.contact_us'].sudo().create(vals)
            return {
                'success': 1
            }
        else:
            return {
                'success': 0
            }


class PageAjax(http.Controller):
    @http.route('/contact-ajax', website=True, auth='public', type='json', methods=['POST'])
    def create_question(self, position=None, **kw):
        val = get_show()
        if position is not None:
            val.update({
                'position': position,
            })

        if val.get('position') == 'leftbottom':
            val.update({
                'leftbottom': True,
            })
            return request.env['ir.ui.view'].render_template('source_lead_website.contact_bottom', val)

        if val.get('position') == 'rightbottom':
            return request.env['ir.ui.view'].render_template('source_lead_website.contact_bottom', val)

        if val.get('position') == 'leftmid':
            val.update({
                'leftmid': True,
            })
            return request.env['ir.ui.view'].render_template('source_lead_website.contact_vertical', val)

        if val.get('position') == 'rightmid':
            val.update({
                'rightmid': True,
            })
            return request.env['ir.ui.view'].render_template('source_lead_website.contact_vertical', val)
