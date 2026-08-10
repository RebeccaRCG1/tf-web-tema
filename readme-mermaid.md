## Modelo Lógico (Mermaid)

```mermaiderDiagram
    ADMIN {
        Int id PK
        String nome
        String email UK
        String senhaHash
        String fotoUrl "opcional"
    }

    DESENHO {
        Int id PK
        String texto "opcional"
        String fotoUrl
        Int categoriaId FK
        DateTime criadoEm
        DateTime atualizadoEm
    }

    CATEGORIA {
        Int id PK
        String nome
        String descricao
    }

    CATEGORIA ||--o{ DESENHO : "possui"
```

> **Nota:** no modelo lógico, a relação entre `Desenho` e `Categoria` foi
> refinada para N:1 (cada desenho pertence a exatamente uma categoria), em
> vez do N:N inicialmente esboçado no modelo conceitual. Essa mudança
> simplifica o schema e reflete melhor a regra de negócio: um desenho
> publicado pertence a uma única categoria por vez.
