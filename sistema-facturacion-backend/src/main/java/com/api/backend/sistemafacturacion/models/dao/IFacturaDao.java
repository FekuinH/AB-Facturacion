package com.api.backend.sistemafacturacion.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.backend.sistemafacturacion.models.entity.Factura;

public interface IFacturaDao extends CrudRepository<Factura, Long> {

}
