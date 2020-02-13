package com.api.backend.sistemafacturacion.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.api.backend.sistemafacturacion.models.entity.Cliente;
import com.api.backend.sistemafacturacion.models.entity.Factura;
import com.api.backend.sistemafacturacion.models.entity.Producto;
import com.api.backend.sistemafacturacion.models.entity.Region;

public interface IClienteService {

	public List<Cliente> getAll();
	
	public Page<Cliente> getAll(Pageable pageable);
	
	public Cliente agregarCliente(Cliente cliente);
	
	public void borrarCliente(Long id);
	
	public Cliente findById(Long id);
	
	public boolean existById(Long id);
	
	public List<Region> getAllRegiones();
	
	public Factura findFacturaById(Long id);
	
	public Factura saveFactura(Factura factura);
	
	public void deleteFactura(Long id);
	
	public List<Producto> findProductoByNombre(String nombre);
}
