/*
 * CODENVY CONFIDENTIAL
 * __________________
 *
 *  [2012] - [2015] Codenvy, S.A.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */
package com.codenvy.ide.hosted.client.inject;

import com.codenvy.ide.hosted.client.HostedEnvConnectionClosedInformer;
import com.codenvy.ide.hosted.client.HostedEnvDocumentTitleDecorator;
import com.google.gwt.inject.client.AbstractGinModule;
import com.google.inject.Singleton;

import org.eclipse.che.ide.api.ConnectionClosedInformer;
import org.eclipse.che.ide.api.DocumentTitleDecorator;
import org.eclipse.che.ide.api.extension.ExtensionGinModule;

/**
 * @author Vitaly Parfonov
 */
@ExtensionGinModule
public class HostedEnvironmentGinModule extends AbstractGinModule {
    @Override
    protected void configure() {
        bind(DocumentTitleDecorator.class).to(HostedEnvDocumentTitleDecorator.class).in(Singleton.class);
        bind(ConnectionClosedInformer.class).to(HostedEnvConnectionClosedInformer.class).in(javax.inject.Singleton.class);
    }
}