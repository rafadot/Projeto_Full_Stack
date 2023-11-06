package com.back.back.V1.repository;

import com.back.back.V1.model.CategoriaGasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaGastoRepository extends JpaRepository<CategoriaGasto,Long> {
    Optional<CategoriaGasto> findByUserIdAndNome(Long userId , String nomeCategoria);
    List<CategoriaGasto> findByUserId(Long userId);
}
