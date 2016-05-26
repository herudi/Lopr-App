/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.herudi.service;

import com.herudi.model.Problem;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author herudi-sahimar
 */
@Stateless
@Path("")
public class ProblemService {
    @PersistenceContext(unitName = "loprPU")
    private EntityManager em;

    public ProblemService() {
        
    }
    
    @GET
    @Path("problem/{uid}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Problem> findByUid(@PathParam("uid") String uid) {
        TypedQuery<Problem> query = em.createQuery("select c from Problem c where c.uid='"+uid+"'", Problem.class);
        return query.getResultList();
    }
    
    @POST
    @Path("problemInsert")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void problemInsert(Problem entity) {
        Query query = em.createNativeQuery("insert into problem(uid,title,problem) values(?,?,?)");
        query.setParameter(1, entity.getUid());
        query.setParameter(2, entity.getTitle());
        query.setParameter(3, entity.getProblem());
        query.executeUpdate();
    }
    
    @POST
    @Path("problemUpdate/{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void problemUpdate(Problem entity, @PathParam("id") Integer id) {
        Query query = em.createNativeQuery("update problem set title=?, problem=? where id=?");
        query.setParameter(1, entity.getTitle());
        query.setParameter(2, entity.getProblem());
        query.setParameter(3, id);
        query.executeUpdate();
    }
    
    @POST
    @Path("problemDelete/{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void problemDelete(Problem entity, @PathParam("id") Integer id) {
        Query query = em.createNativeQuery("delete from problem where id=?");
        query.setParameter(1, id);
        query.executeUpdate();
    }
    
    
}
