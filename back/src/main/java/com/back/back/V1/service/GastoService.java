package com.back.back.V1.service;

import com.back.back.V1.model.CategoriaGasto;
import com.back.back.V1.model.UserApp;
import com.back.back.V1.repository.CategoriaGastoRepository;
import com.back.back.V1.repository.GastoRepository;
import com.back.back.exceptions.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GastoService {
    private final GastoRepository gastoRepository;
    private final CategoriaGastoRepository categoriaRepository;
    private final UserService userService;

    public CategoriaGasto cirarCategoria(CategoriaGasto categoriaGasto){
        UserApp user = userService.userLogado();

        Optional<CategoriaGasto> categoriaOpt = categoriaRepository.findByUserIdAndNome(user.getId(),categoriaGasto.getNome());

        if(categoriaOpt.isPresent()){
            throw new BadRequestException("Categoria já existe");
        }

        categoriaGasto.setUser(user);
        return categoriaRepository.save(categoriaGasto);
    }

    public List<CategoriaGasto> listaCategorias(){
        UserApp user = userService.userLogado();

        return categoriaRepository.findByUserId(user.getId());
    }
}
