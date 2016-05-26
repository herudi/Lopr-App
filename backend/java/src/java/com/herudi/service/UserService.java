/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.herudi.service;

import com.herudi.model.User;
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
public class UserService {
    @PersistenceContext(unitName = "loprPU")
    private EntityManager em;

    public UserService() {
        
    }
    
    @GET
    @Path("userOnline")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> userOnline() {
        TypedQuery<User> query = em.createQuery("select c from User c where c.status='1'", User.class);
        return query.getResultList();
    }
    
    @POST
    @Path("userInsert")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void userInsert(User entity) {
        Query query = em.createNativeQuery("insert into user values(?,?,?,?)");
        query.setParameter(1, entity.getUid());
        query.setParameter(2, entity.getDisplayName());
        query.setParameter(3, entity.getPicture());
        query.setParameter(4, entity.getStatus());
        query.executeUpdate();
    }
    
    @POST
    @Path("userUpdate/{uid}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void userUpdate(User entity, @PathParam("uid") String uid) {
        Query query = em.createNativeQuery("update user set displayName=?, picture=?, status=? where uid=?");
        query.setParameter(4, uid);
        query.setParameter(1, entity.getDisplayName());
        query.setParameter(2, entity.getPicture());
        query.setParameter(3, entity.getStatus());
        query.executeUpdate();
    }
    
    @POST
    @Path("status/{uid}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void status(User entity, @PathParam("uid") String uid) {
        Query query = em.createNativeQuery("update user set status=? where uid=?");
        query.setParameter(2, uid);
        query.setParameter(1, entity.getStatus());
        query.executeUpdate();
    }
    
    @GET
    @Path("userByUid/{uid}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<User> userByUid(@PathParam("uid") String uid) {
        TypedQuery<User> query = em.createQuery("select c from User c where c.uid='"+uid+"'", User.class);
        return query.getResultList();
    }
}
