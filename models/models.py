# -*- coding: utf-8 -*-

from pydoc import visiblename
from odoo import models, fields, api, _



class popup_message_backend(models.Model):
    _name = 'popup.message.backend'
    _description = 'Popup message backend'

    name = fields.Char(string="Name", required=True)

    @api.model
    def create(self, vals):
        result = super(popup_message_backend, self).create(vals)
        return result
    

    @api.onchange('name')
    def name_onchange(self):
        if self.name:
            self.name = "Habib"
        
        def fun():
            return {
                'name': 'Message',
                'type': 'ir.actions.act_window',
                'view_type': 'form',
                'view_mode': 'form',
                'res_model': 'sh.message.wizard34435',
                'views': [(view_id, 'form')],
                'view_id': view.id,
                'target': 'new',
                'context': context,
            }

        view = self.env.ref('sh_message.sh_message_wizard')
        view_id = view and view.id or False
        context = dict(self._context or {})
        context['message'] = "dfgsdfgsdfg"
        fun()
    
