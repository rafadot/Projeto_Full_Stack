package com.back.back.V1.controller;

import com.back.back.V1.model.CategoriaGasto;
import com.back.back.V1.service.GastoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gasto")
@RequiredArgsConstructor
public class GastoController {
    private final GastoService gastoService;

    @PostMapping("/categoria")
    public ResponseEntity<CategoriaGasto> criarCategoria(@RequestBody CategoriaGasto categoriaGasto){
        return new ResponseEntity<>(gastoService.cirarCategoria(categoriaGasto) , HttpStatus.CREATED);
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<CategoriaGasto>> categorias(){
        return new ResponseEntity<>(gastoService.listaCategorias(),HttpStatus.OK);
    }
}
