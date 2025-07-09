package com.shopistry.backend.service;
import com.shopistry.backend.model.Product;
import com.shopistry.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;
    public List<Product> getAllProducts() {
        return repo.findAll();
    }
}
