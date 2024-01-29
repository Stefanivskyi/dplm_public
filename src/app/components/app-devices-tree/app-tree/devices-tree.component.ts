import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { ZoomedElementBaseType } from 'd3-zoom';

import { TreeProject } from '../../../shared/models/devices-tree/treeProject.model';
import { ProjectService } from '../../../services/project.service';
import { AsideMenuService } from '../../../services/aside-menu.service';


@Component({
  selector: 'app-devices-tree-component',
  templateUrl: './devices-tree.component.html',
  styleUrls: ['./devices-tree.component.scss']
})

export class AppTreeComponent implements OnInit {

  treeProjects: TreeProject[] = [];
  nodeForAside: Object = {};

  @Input() set treeProject(treeProject: TreeProject[]) {
    this.treeProjects = treeProject;

    const treeDataSource = {
      name: this.treeProjects[0].name,
      children: this.treeProjects[0].children.length !== 0 ? this.treeProjects[0].children : '0'
    };
    this.initializeTree(treeDataSource);

  }

  constructor(private projectService: ProjectService, private asideMenuService: AsideMenuService) {
  }

  ngOnInit() {
    if (this.treeProjects.length === 0) {

      this.projectService.getTreeChildren().subscribe(tree => {
        this.treeProjects = tree;

        const treeDataSource = {
          name: 'Projects',
          children: this.treeProjects
        };
        this.initializeTree(treeDataSource);
      })
    }
  };


  initializeTree = (treeDataSource) => {

    const treeNode = (node) => {
      this.asideMenuService.getTreeNode(node);
    }

    const click = function (d) {
      treeNode(d);

      if (d3.event.defaultPrevented) { return; }
      d = toggleChildren(d);
      update(d);

      if (d.children || d._children) {
        centerNode(d);
      }
      document.querySelector('body').classList.remove('aside-menu-hidden');
    }

    let i = 0;
    let root;
    let treemap;
    const duration = 750;

    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    const viewerWidth = 960 - margin.left - margin.right;
    const viewerHeight = 600;

    root = d3.hierarchy(treeDataSource, <any>(d => d.children));
    root.children.forEach(collapse);


    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null
      }
    }

    function visit(parent, visitFn, childrenFn) {
      if (!parent) { return; }
      visitFn(parent);
      const children = childrenFn(parent);
      if (children) {
        const count = children.length;
        for (i = 0; i < count; i++) {
          visit(children[i], visitFn, childrenFn);
        }
      }
    }

    const zoomListener = d3.zoom().scaleExtent([0.1, 3]).on('zoom', zoom);

    const svg = d3.select('#tree').append('svg').attr('width', '100%')
      .attr('height', viewerHeight).call(zoomListener);
    const svgG = svg.append('g');

    function zoom() {
      if (d3.event.transform !== null) {
        svgG.attr('transform', d3.event.transform);
      }
    }

    function centerNode(source) {
      const t = d3.zoomTransform(<ZoomedElementBaseType>svg.node());
      let x = -source.y0;
      let y = -source.x0;
      x = x * t.k + viewerWidth / 1.3;
      y = y * t.k + viewerHeight / 2;
      d3.select('svg').transition().duration(duration)
        .call(<any>zoomListener.transform, d3.zoomIdentity.translate(x, y).scale(t.k));
    }

    function toggleChildren(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      return d;
    }

    function diagonal(s, d) {
      if (s !== null && d !== null) {
        return 'M ' + s.y + ' ' + s.x
          + ' C ' + ((s.y + d.y) / 2) + ' ' + s.x + ','
          + ((s.y + d.y) / 2) + ' ' + d.x + ','
          + ' ' + d.y + ' ' + d.x;
      }
    }

    function update(source) {

      const levelWidth = [1];
      const childCount = <any>((level, n) => {

        if (n.children && n.children.length > 0) {
          if (levelWidth.length <= level + 1) { levelWidth.push(0); }

          levelWidth[level + 1] += n.children.length;
          n.children.forEach(function (d) {
            childCount(level + 1, d);
          });
        }
      });
      childCount(0, root);
      const newHeight = d3.max(levelWidth) * 22;

      treemap = d3.tree().size([newHeight, viewerWidth]);
      const treeData = treemap(root);

      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      nodes.forEach(<any>(d => {
        d.y = d.depth * 180;
      }));
      const node = svgG.selectAll('g.node').data(nodes, <any>(d => d.id || (d.id = ++i)));
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', <any>(d => 'translate(' + source.y0 + ',' + source.x0 + ')'))
        .on('click', click);
      nodeEnter.append('circle').attr('class', 'nodeCircle')
        .attr('r', 4.5)
        .style('fill', <any>(d => d._children ? '#20a8d8' : '#fff'));
      nodeEnter.append('text').attr('x', <any>(d => d.children || d._children ? -10 : 10))
        .attr('dy', '.35em')
        .attr('class', 'nodeText')
        .attr('text-anchor', <any>(d => d.children || d._children ? 'end' : 'start'))
        .text(<any>(d => d.data.name)).style('fill-opacity', 0);

      node.select('text').attr('x', <any>(d => d.children || d._children ? -10 : 10))
        .attr('text-anchor', <any>(d => d.children || d._children ? 'end' : 'start'))
        .text(<any>(d => d.data.name));
      node.select('circle.nodeCircle').attr('r', 4.5).style('fill', <any>(d => d._children ? '#20a8d8' : '#fff'));
      const nodeUpdate = nodeEnter.merge(node);
      nodeUpdate.transition().duration(duration).attr('transform', <any>(d => 'translate(' + d.y + ',' + d.x + ')'));
      nodeUpdate.select('text').style('fill-opacity', 1);
      const nodeExit = node.exit().transition().duration(duration).attr('transform',
        <any>(d => 'translate(' + source.y + ',' + source.x + ')')).remove();
      nodeExit.select('circle').attr('r', 0);
      nodeExit.select('text').style('fill-opacity', 0);
      const link = svgG.selectAll('path.link').data(links, <any>(d => d.id));
      const linkEnter = link.enter().insert('path', 'g').attr('class', 'link')
        .attr('d', <any>(d => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        }));
      const linkUpdate = linkEnter.merge(link);
      linkUpdate.transition().duration(duration).attr('d', <any>(d => diagonal(d, d.parent)));
      link.exit().transition().duration(duration).attr('d', <any>(d => {
        const o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })).remove();
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    root.x0 = 200;
    root.y0 = 50;

    update(root);
    centerNode(root);
  }
}
