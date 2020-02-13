package com.api.backend.sistemafacturacion.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
//import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
//import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name = "clientes")
public class Cliente implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCliente;

	@Column(nullable = false)
	@NotEmpty(message = "EL NOMBRE NO PUEDE ESTAR VACIO")
	private String nombre;

	@Column(nullable = false)
	@NotEmpty(message = " ELAPELLIDO NO PUEDE ESTAR VACIO")
	private String apellido;

	@Column(nullable = false)
	@NotEmpty
	private String dni;

	@Column(nullable = false, unique = true)
	@NotEmpty
	private String email;

	@NotEmpty
	private String telefono;

	@Column(name = "fecha_ingreso")
	@Temporal(TemporalType.DATE)
	private Date fechaIngreso;

	private String foto;

	@NotNull(message = "La region no puede estar vacia")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "region_id")
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	private Region region;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "cliente", cascade = CascadeType.ALL)
	@JsonIgnoreProperties(value={"cliente","hibernateLazyInitializer", "handler" }, allowSetters = true)
	private List<Factura> facturas;

	public Cliente() {
		this.facturas = new ArrayList<>();
	}

	public List<Factura> getFacturas() {
		return facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

	public Long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Long id) {
		this.idCliente = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Date getFechaIngreso() {
		return fechaIngreso;
	}

	public void setFechaIngreso(Date fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

//	public Pais getNacionalidad() {
//		return nacionalidad;
//	}
//
//	public void setNacionalidad(Pais nacionalidad) {
//		this.nacionalidad = nacionalidad;
//	 }

	public static long getSerialversionuid() {
		return serialVersionUID;

	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String toString() {
		return "Cliente [idCliente=" + idCliente + ", nombre=" + nombre + ", apellido=" + apellido + ", dni=" + dni
				+ ", email=" + email + ", telefono=" + telefono + ", fechaIngreso=" + fechaIngreso + "]";
	}

}
