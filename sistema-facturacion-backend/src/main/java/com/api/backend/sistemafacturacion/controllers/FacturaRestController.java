package com.api.backend.sistemafacturacion.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.api.backend.sistemafacturacion.models.entity.Factura;
import com.api.backend.sistemafacturacion.models.entity.Producto;
import com.api.backend.sistemafacturacion.models.services.IClienteService;

@CrossOrigin(origins = {"http://localhost:4200","*","https://ab-facturacion.firebaseapp.com"})
@RestController
@RequestMapping("/api")
public class FacturaRestController {

	@Autowired
	private IClienteService clienteService;

	@Secured({ "ROLE_ADMIN", "ROLE_USER" })
	@GetMapping("/facturas/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Factura mostrarDetalle(@PathVariable Long id) {

		return clienteService.findFacturaById(id);
	}

	@Secured({ "ROLE_ADMIN"})
	@DeleteMapping("/facturas/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {

		clienteService.deleteFactura(id);
	}

	@Secured({ "ROLE_ADMIN"})
	@GetMapping("/facturas/filtrar-productos/{termino}")
	@ResponseStatus(HttpStatus.OK)
	public List<Producto> filtrarProducto(@PathVariable String termino) {

		return clienteService.findProductoByNombre(termino);
	}

	@Secured({ "ROLE_ADMIN"})
	@PostMapping("/facturas")
	@ResponseStatus(HttpStatus.CREATED)
	public Factura crear(@RequestBody Factura factura) {

		return clienteService.saveFactura(factura);
	}

}
