package com.distionary.backend.dictionary;

import com.distionary.backend.common.ConflictException;
import com.distionary.backend.common.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DictionaryService {

    private final DictionaryRepository repository;

    public DictionaryService(DictionaryRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Dictionary> listAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "lastModifiedAt"));
    }

    @Transactional(readOnly = true)
    public Dictionary get(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Dictionary not found: " + id));
    }

    public Dictionary create(DictionaryDtos.CreateRequest req) {
        if (repository.existsByApiKey(req.apiKey())) {
            throw new ConflictException("Dictionary with apiKey '" + req.apiKey() + "' already exists");
        }
        Dictionary d = new Dictionary();
        d.setApiKey(req.apiKey());
        d.setName(req.name());
        d.setDescription(req.description());
        d.setIcon(req.icon());
        d.setDataSource(req.dataSource() != null ? req.dataSource() : DictionarySource.INTERNAL);
        d.setStatus(req.status() != null ? req.status() : DictionaryStatus.DRAFT);
        return repository.save(d);
    }
}
